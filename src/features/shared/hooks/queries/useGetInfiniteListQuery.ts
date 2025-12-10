// Features
import { IListApiResponse, IListQueryParams } from "../../types";

// Utils
import axiosClient from "@/config/axiosInstance";

// Libs
import { useInfiniteQuery } from "@tanstack/react-query";

interface UseGetInfiniteListQueryOptions<_TRow extends object> {
	endpoint: string;
	queryKey: string | string[];
	params?: Omit<IListQueryParams, "page">;
	initialPageParam?: number;
	enabled?: boolean;
}

export const useGetInfiniteListQuery = <TRow extends object>({
	endpoint,
	queryKey,
	params,
	initialPageParam = 1,
	enabled = true,
}: UseGetInfiniteListQueryOptions<TRow>) => {
	const queryKeyArray = Array.isArray(queryKey) ? queryKey : [queryKey];

	return useInfiniteQuery<IListApiResponse<TRow>>({
		queryKey: [...queryKeyArray, params],
		queryFn: async ({ pageParam }) => {
			const response = await axiosClient.get<IListApiResponse<TRow>>(endpoint, {
				params: {
					...params,
					page: pageParam,
				},
			});
			return response.data;
		},
		getNextPageParam: (lastPage) => {
			if (!lastPage?.data?.has_next_page) {
				return undefined;
			}
			return lastPage.data.next_page ?? undefined;
		},
		initialPageParam,
		enabled,
	});
};

export default useGetInfiniteListQuery;
