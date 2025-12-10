// React
import { useEffect, useMemo, useCallback } from 'react';

// Features
import { DATE_LOCK_SCHEMA, DateLockFormValues } from '../schema';
import { useUpdateDateLockMutation } from './mutations/useUpdateDateLock';
import { useGetDateLockQuery } from './queries/useGetDateLock';

// Libs
import { useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import toast from '@/lib/toast';
import { formatDateToISOString, getTodayAtMidnight } from '@/utils/date-utils';

const AUTOMATED_LOCKING_ENABLED = 1;
const AUTOMATED_LOCKING_DISABLED = 0;

export const useDateLockForm = () => {
	const { data, isLoading, isFetching } = useGetDateLockQuery();
	const { mutateAsync, isPending } = useUpdateDateLockMutation();

	const form = useForm<DateLockFormValues>({
		resolver: zodResolver(DATE_LOCK_SCHEMA),
		defaultValues: {
			date_from: null,
			date_to: null,
			is_date_lock_automatic: AUTOMATED_LOCKING_DISABLED,
			days_before: 0,
			days_after: 0,
		}
	});

	const isDateLockAutomatic = useWatch({ control: form.control, name: 'is_date_lock_automatic' });
	const formData = data?.data;

	useEffect(() => {
		if (formData && !isLoading && !isFetching) {
			form.reset({
				date_from: formData.date_from,
				date_to: formData.date_to,
				is_date_lock_automatic: formData.is_date_lock_automatic,
				days_before: formData.days_before,
				days_after: formData.days_after,
			});
		}
	}, [formData, form, isLoading, isFetching]);

	const resetToServerData = useCallback(() => {
		if (!formData) return;
		form.reset({
			date_from: formData.date_from,
			date_to: formData.date_to,
			is_date_lock_automatic: formData.is_date_lock_automatic,
			days_before: formData.days_before,
			days_after: formData.days_after,
		});
	}, [formData, form]);

	const onSubmit = useCallback(async (formValues: DateLockFormValues) => {
		const toastId = toast.loading('Updating date lock...');

		const payload = {
			...formValues,
			date_from: formatDateToISOString(formValues.date_from),
			date_to: formatDateToISOString(formValues.date_to),
		};

		try {
			await mutateAsync(payload);
			toast.success('Date lock updated successfully', { id: toastId });
		} catch (error: unknown) {
			console.error(error);
			toast.error('Failed to update date lock', { id: toastId });
		}
	}, [mutateAsync]);

	const handleDaysBeforeChange = useCallback((value: string) => {
		const days = Number(value);
		const today = getTodayAtMidnight();
		const targetDate = new Date(today);
		targetDate.setDate(today.getDate() - days);
		form.setValue('date_from', targetDate);
	}, [form]);

	const handleDaysAfterChange = useCallback((value: string) => {
		const days = Number(value);
		const today = getTodayAtMidnight();
		const targetDate = new Date(today);
		targetDate.setDate(today.getDate() + days);
		form.setValue('date_to', targetDate);
	}, [form]);

	const handleAutomatedLockingChange = useCallback((checked: boolean) => {
		const value = checked ? AUTOMATED_LOCKING_ENABLED : AUTOMATED_LOCKING_DISABLED;
		form.setValue('is_date_lock_automatic', value);

		if (checked) {
			const today = getTodayAtMidnight();
			form.setValue('date_from', formData?.days_before ? formData.date_from : today);
			form.setValue('date_to', formData?.days_after ? formData.date_to : today);
			form.setValue('days_before', formData?.days_before || 0);
			form.setValue('days_after', formData?.days_after || 0);
		} else if (formData) {
			form.setValue('date_from', formData.date_from);
			form.setValue('date_to', formData.date_to);
			form.setValue('days_before', 0);
			form.setValue('days_after', 0);
		}
	}, [form, formData]);

	const isDisabled = useMemo(() => isLoading || isFetching || isPending, [isLoading, isFetching, isPending]);
	const isAutomatedLockingEnabled = useMemo(() => isDateLockAutomatic === AUTOMATED_LOCKING_ENABLED, [isDateLockAutomatic]);
	const disableDateFields = useMemo(() => isAutomatedLockingEnabled || isDisabled, [isAutomatedLockingEnabled, isDisabled]);
	const disableDaysFields = useMemo(() => !isAutomatedLockingEnabled || isDisabled, [isAutomatedLockingEnabled, isDisabled]);

	return {
		form,
		isDisabled,
		disableDateFields,
		disableDaysFields,
		onSubmit,
		resetToServerData,
		handleDaysBeforeChange,
		handleDaysAfterChange,
		handleAutomatedLockingChange,
		AUTOMATED_LOCKING_ENABLED,
	};
};

