import { useEffect, useMemo, useState } from 'react';

// Libs
import { zodResolver } from '@hookform/resolvers/zod';
import { CornerLeftUp } from 'lucide-react';
import { Controller, useForm } from 'react-hook-form';

// Features
import { useGetBaselineSecurityQuery } from '@/features/utilities/baseline-security/hooks/queries/useGetBaselineSecurityQuery';
import { BASELINE_SECURITY_SCHEMA, BaselineSecurityFormData } from '@/features/utilities/baseline-security/schemas';
import { IFormattedSecurityParameter, IBaselineSecurity } from '@/features/utilities/baseline-security/types';
import { SYSTEM_SECURITY_PARAMETERS } from '@/features/utilities/baseline-security/utils/constants';

// Components
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { IColumn } from '@/components/DataTable/types';
import { useUpdateBaselineSecurityMutation } from './mutations/useUpdateBaselineSecurityMutation';
import { toast } from 'sonner';
import useConfirmStore from '@/stores/useConfirmStore';

const useBaselineSecurityForm = () => {
	const [activeTab, setActiveTab] = useState<string>('password-settings');

	const { data, isLoading, isFetching, isError } = useGetBaselineSecurityQuery();
	const { confirm, close, setLoading } = useConfirmStore();
	const { mutateAsync, isPending } = useUpdateBaselineSecurityMutation();

	const security = data?.data;

	const DEPENDENCIES: Record<string, string[]> = useMemo(() => ({
		is_force_login_allowed: ['do_lock_account_on_dual_login'],
		is_user_password_expire_after_enabled: ['is_remind_password_expiration_enabled'],
	}), []);

	const toForm = (data: IBaselineSecurity): BaselineSecurityFormData => {
		const result: Partial<BaselineSecurityFormData> = {};

		for (const [key, value] of Object.entries(data)) {
			result[key as keyof BaselineSecurityFormData] =
				typeof value === "boolean" ? (value ? 1 : 0) : value;
		}

		return result as BaselineSecurityFormData;
	};

	const form = useForm<BaselineSecurityFormData>({
		resolver: zodResolver(BASELINE_SECURITY_SCHEMA),
		defaultValues: security ? toForm(security) : {},
	});

	useEffect(() => {
		if (!isLoading && !isFetching && data?.data) {
			form.reset(toForm(data.data));
		}
	}, [data?.data, isLoading, isFetching, form]);

	const SYSTEM_SECURITY_COLUMNS: IColumn<IFormattedSecurityParameter>[] = useMemo(() => {
		return [
			{
				key: "isEnabled",
				header: "Action",
				render: (row) => (
					<div className="flex items-center gap-2">
						{row.icon && <CornerLeftUp />}
						<Controller
							control={form.control}
							name={row.toggle_field}
							render={({ field }) => {
								const parent = Object.entries(DEPENDENCIES).find(([, children]) =>
									children.includes(row.toggle_field)
								)?.[0];

								const isDisabled = parent ? form.watch(parent as keyof BaselineSecurityFormData) !== 1 : false;

								return (
									<Switch
										disabled={isDisabled || isPending}
										checked={!!field.value}
										onCheckedChange={(checked) => {
											field.onChange(checked ? 1 : 0);

											if (!checked && DEPENDENCIES[row.toggle_field]) {
												DEPENDENCIES[row.toggle_field].forEach((child) => {
													form.setValue(child as keyof BaselineSecurityFormData, 0);
												});
											}
										}}
									/>
								);
							}}
						/>
					</div>
				),
			},
			{
				key: "description",
				header: "Description",
				slotProps: {
					header: { className: 'whitespace-nowrap' },
					cell: { className: 'whitespace-nowrap' },
				},
				render: (row) => row.description,
			},
			{
				key: "value",
				header: "Value",
				render: (row) => {
					const isEnabled = form.watch(row.toggle_field) === 1;

					return (
						row.value_field && (
							<Controller
								control={form.control}
								name={row.key as keyof BaselineSecurityFormData}
								render={({ field }) => (
									<Input
										{...field}
										value={field.value ?? ""}
										type="number"
										className="w-[100px] text-right"
										onChange={(e) => field.onChange(Number(e.target.value))}
										min={0}
										disabled={!isEnabled || isPending}
									/>
								)}
							/>
						)
					);
				},
				slotProps: {
					header: { className: 'text-right' },
					cell: { className: 'flex justify-end' },
				},
			},
		];
	}, [DEPENDENCIES, form, isPending]);

	const LOGIN_DATA = useMemo(() => {
		return SYSTEM_SECURITY_PARAMETERS.filter((row) => row.tab === 'login-configuration');
	}, []);

	const PASSWORD_DATA = useMemo(() => {
		return SYSTEM_SECURITY_PARAMETERS.filter((row) => row.tab === 'password-settings');
	}, []);

	const onSubmit = async (data: BaselineSecurityFormData) => {  
        const confirmed = await confirm({
            title: 'Update Baseline Security?',
			description: 'Are you sure you want to update the baseline security?',
			variant: 'warning',
		});
        
		if (!confirmed) return;
        
		setLoading(true);
        
		const toastId = toast.loading('Updating baseline security...');
		try {
            await mutateAsync(data);
            console.log(data);
			toast.success('Baseline security updated successfully', { id: toastId });
		} catch (error) {
            console.error(error);
			toast.error('Failed to update baseline security', { id: toastId });
		} finally {
			setLoading(false);
			close();
		}
	};

	return {
		isLoading: isLoading || isFetching,
        isPending,
		isError,

		activeTab,
		setActiveTab,

		form,
		onSubmit,

		LOGIN_DATA,
		PASSWORD_DATA,
		SYSTEM_SECURITY_COLUMNS
	};
};

export default useBaselineSecurityForm;