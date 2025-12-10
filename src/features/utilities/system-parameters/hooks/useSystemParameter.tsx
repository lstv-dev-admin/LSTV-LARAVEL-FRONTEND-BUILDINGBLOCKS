import { useEffect, useMemo } from "react";

// Features
import { SYSTEM_PARAMETER_SCHEMA, SystemParameterFormData } from "../schema";
import { ISystemParameterRow } from "../types";
import { useSystemParameterMutation } from "./mutations/useSystemParameterMutation";
import { useGetSystemParamsQuery } from "./queries/useGetSystemParamsQuery";

// Libs
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";

// Components
import { IColumn } from "@/components/DataTable";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";

// Utils
import useConfirmStore from "@/stores/useConfirmStore";

const useSystemParameter = () => {
    const { confirm, setLoading, close } = useConfirmStore();
    const { data, isLoading, isError, isFetching } = useGetSystemParamsQuery();
    const { mutateAsync, isPending } = useSystemParameterMutation();

    const form = useForm<SystemParameterFormData>({
        resolver: zodResolver(SYSTEM_PARAMETER_SCHEMA),
        defaultValues: {
            max_activity_log_record_counts: 50,
            is_date_lock_global: true,
        },
    });

    useEffect(() => {
        if (data?.data && !isLoading && !isFetching) {
            form.reset({
                max_activity_log_record_counts: data?.data?.max_activity_log_record_counts ?? 50,
                is_date_lock_global: data?.data?.is_date_lock_global ?? true,
            });
        }
    }, [data?.data, form, isLoading, isFetching]);

    const onSubmit = async (data: SystemParameterFormData) => {
        const confirmed = await confirm({
            title: 'Update System Parameters?',
            description: 'Are you sure you want to update the system parameters?',
        })

        if (!confirmed) return;
        setLoading(true)

        const toastId = toast.loading('Updating system parameters...');
        try {
            await mutateAsync(data);
            toast.success('System parameters updated successfully', { id: toastId });
        } catch (error) {
            console.error(error);
            toast.error('Failed to update system parameters', { id: toastId });
        } finally {
            close();
            setLoading(false);
        }
    };

    const TABLE_DATA: ISystemParameterRow[] = useMemo(() => [
        {
            id: 'activity-logs',
            parameter: 'Activity Logs',
            description: 'Specify the maximum number of activity log records the system is allowed to store.',
            value: data?.data?.max_activity_log_record_counts,
            type: 'number'
        },
        {
            id: 'date-lock',
            parameter: 'Date Lock',
            description: 'Enable or disable the system-wide date locking feature for restricting data entry to specific date ranges.',
            value: data?.data?.is_date_lock_global,
            type: 'boolean'
        }
    ], [data?.data]);

    const SYSTEM_PARAMETER_COLUMNS: IColumn<ISystemParameterRow>[] = useMemo(() => [
        {
            key: 'parameter',
            header: 'Parameter',
            slotProps: { cell: { className: 'whitespace-nowrap' } },
        },
        {
            key: 'description',
            header: 'Description',
            slotProps: { cell: { className: 'min-w-[300px]' } },
        },
        {
            key: 'value',
            header: 'Value / Action',
            slotProps: {
                header: { className: 'text-right whitespace-nowrap' },
                cell: { className: 'text-right' }
            },
            render: (row) => {
                if (row.type === 'number') {
                    return (
                        <Controller 
                            name="max_activity_log_record_counts"
                            control={form.control}
                            render={({ field }) => (
                                <Input 
                                    min={50} 
                                    {...field}
                                    type="number" 
                                    className="w-[90px] ml-auto"
                                    disabled={isPending} 
                                    onChange={(e) => field.onChange(Number(e.target.value))}
                                />
                            )}
                        />

                    );
                }

                return (
                    <Controller
                        name="is_date_lock_global"
                        control={form.control}
                        defaultValue={false}
                        render={({ field: { value, onChange } }) => (
                            <Switch
                                checked={value}
                                disabled={isPending}
                                onCheckedChange={onChange}
                            />
                        )}
                    />
                );
            }
        }
    ], [form.control, isPending]);

    return {
        form,
        onSubmit,
        TABLE_DATA,
        SYSTEM_PARAMETER_COLUMNS,

        isError,
        isPending,
        isLoading,
        isFetching,
    };
};

export default useSystemParameter;