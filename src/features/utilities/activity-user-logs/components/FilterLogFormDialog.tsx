// Components
import { Dialog, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import DialogContentWrapper from '@/components/DialogWrapper';
import FilterLogForm from './FilterLogForm';

// Libs
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSearchParams } from 'react-router-dom';
import { useEffect, useMemo } from 'react';
import useActivityUserLogsStore from '../store';
import { USER_ACTIVITY_LOGS_DEFAULT_FILTERS } from '../utils/constants';
import { filterLogFormSchema, FilterLogFormData } from '../schema';
import { formatDateToString } from '@/utils/date-utils';
import { parseDateString } from '@/utils/date-utils';

const FilterLogFormDialog = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const { setFilters, isDialogOpen, closeDialog } = useActivityUserLogsStore();

	const form = useForm<FilterLogFormData>({
		resolver: zodResolver(filterLogFormSchema),
		defaultValues: USER_ACTIVITY_LOGS_DEFAULT_FILTERS,
	});

    const filterValues = useMemo(() => {
        const parse = (key: string) => {
            const val = searchParams.get(key);
            if (!val) return "";
            if (key === "date_from" || key === "date_to") {
                const parsedDate = parseDateString(val, "yyyy-mm-dd");
                return parsedDate ? formatDateToString(parsedDate) : "";
            }
            return val;
        };
      
        return {
            date_from: parse("date_from"),
            date_to: parse("date_to"),
            remarks: parse("remarks"),
            activity: parse("activity"),
            user: parse("user"),
        };
    }, [searchParams]);

	useEffect(() => {
		if (isDialogOpen) form.reset(filterValues);
	}, [filterValues, form, isDialogOpen]);

	const handleSubmit = (values: FilterLogFormData) => {
        const processedValues = Object.fromEntries(
            Object.entries(values).filter(([, v]) => v).map(([k, v]) => [k, String(v)])
        );
        
        setFilters(processedValues);
        setSearchParams(processedValues);
        closeDialog();
    }

	return (
		<Dialog open={isDialogOpen} onOpenChange={(open) => !open && closeDialog()}>
			<DialogContentWrapper disableOverlayClose aria-labelledby='filter-logs-dialog-title'>
				<DialogHeader>
					<DialogTitle>Filter Logs</DialogTitle>
				</DialogHeader>
				<FilterLogForm
					form={form}
					onSubmit={handleSubmit}
				/>
			</DialogContentWrapper>
		</Dialog>
	);
};

export default FilterLogFormDialog;