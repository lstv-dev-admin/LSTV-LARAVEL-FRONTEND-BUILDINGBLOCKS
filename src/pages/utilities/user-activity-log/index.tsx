import { useEffect, useMemo, useRef } from 'react';

// Components
import PageHeader from '@/components/PageHeader.tsx';
import { Separator } from '@/components/ui/separator';
import ActionTable from '@/components/DataTable/ActionTable';

// Features
import usePagination from '@/features/shared/hooks/usePagination';
import { usePrintMutation } from '@/features/shared/hooks/mutations';
import FilterLogFormDialog from '@/features/utilities/activity-user-logs/components/FilterLogFormDialog';
import { USER_ACTIVITY_LOGS_ACTIONS, USER_ACTIVITY_LOGS_COLUMNS } from '@/features/utilities/activity-user-logs/utils/constants';
import { useGetUserActivityLogsQuery } from '@/features/utilities/activity-user-logs/hooks/queries/useGetUserActivityLogsQuery';
import useActivityUserLogsStore from '@/features/utilities/activity-user-logs/store';

// Libs
import { useTypedSearchParams } from '@/hooks/use-typed-search-params';
import PageTitle from '@/components/PageTitle';

interface ActivityLogFilters {
	date_from: string;
	date_to: string;
	remarks: string;
	activity: string;
	user: string;
}

const ActivityUsersLogPage = () => {
    const { setSearch, params, setPage, setItemsPerPage } = usePagination();
    const { page, per_page, sort_order } = params;
    const { setFilters, openDialog } = useActivityUserLogsStore();

	const defaultFilters = useMemo(() => ({
		date_from: '',
		date_to: '',
		remarks: '',
		activity: '',
		user: '',
	}), []);

	const filters = useTypedSearchParams<ActivityLogFilters>(defaultFilters);
	const prevFiltersRef = useRef<string>('');

	useEffect(() => {
		const filtersString = JSON.stringify(filters);
		if (prevFiltersRef.current !== filtersString) {
			prevFiltersRef.current = filtersString;
			setFilters(filters);
		}
	}, [filters, setFilters]);

	const apiFilters = {
		date_from: filters.date_from || undefined,
		date_to: filters.date_to || undefined,
		remarks: filters.remarks || undefined,
		activity: filters.activity || undefined,
		user: filters.user || undefined,
	};

    const { data: userActivityLogs, isLoading, isError } = useGetUserActivityLogsQuery({ page, per_page, sort_order, ...apiFilters });
	const { mutateAsync: printActivityLogs, isPending: isPrinting } = usePrintMutation({
		endpoint: "/utilities/user-activity-log",
		title: "Activity Users Logs",
	});

    const data = userActivityLogs?.data;

	return (
		<>
			<PageTitle title='Activity Users Logs' />
			<FilterLogFormDialog />
			<PageHeader title="Activity Users Logs" subTitle="Manage activity users logs" />
			<Separator className="my-4" />
			<ActionTable
                columns={USER_ACTIVITY_LOGS_COLUMNS}
                data={data?.items}
                itemSize={per_page}
                currentPage={page}
                onSearch={(q) => setSearch(q)}
                totalPages={data?.total_pages}
                hasNextPage={data?.has_next_page}
                onPageChange={setPage}
                onItemsPerPageChange={setItemsPerPage}
                isLoading={isLoading}
                isError={isError}
                actions={USER_ACTIVITY_LOGS_ACTIONS}
                onAction={(type) => {
                    const actionHandlers: Record<string, () => void> = {
                        print: () => printActivityLogs(),
                        filter: () => openDialog(),
                    };
                    
                    const handler = actionHandlers[type];
                    if (handler) handler();
                }}
            />
		</>
	);
};

export default ActivityUsersLogPage