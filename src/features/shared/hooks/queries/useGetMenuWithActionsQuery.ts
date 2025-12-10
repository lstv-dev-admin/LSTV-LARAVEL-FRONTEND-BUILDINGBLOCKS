// Features
import { ApiMenuItem, sharedApi } from '@features/shared/api';

// Libs
import { AxiosError } from 'axios';
import { UseQueryOptions, useQuery } from '@tanstack/react-query';

interface UseGetMenuWithActionsQueryOptions {
	enabled?: boolean;
	refetchOnMount?: boolean;
}

const useGetMenuWithActionsQuery = (options?: UseGetMenuWithActionsQueryOptions) => {
	return useQuery<ApiMenuItem[], AxiosError>({
		queryKey: ['menu-with-actions-query'],
		queryFn: async () => {
			const { data } = await sharedApi.getMenuWithActions();
			return data;
		},
		enabled: options?.enabled ?? false,
		refetchOnMount: options?.refetchOnMount ?? false,
		refetchOnWindowFocus: false,
	});
};

export default useGetMenuWithActionsQuery;

