// Features
import { masterfileApi } from "@features/masterfile/api/";
import { IListApiResponse, IListQueryParams } from "@/features/shared";

// Libs
import { useQuery } from "@tanstack/react-query";

type QueryKeyType = string | readonly unknown[] | { list: () => readonly unknown[] };

interface MasterfileQueryOptions {
	endpoint: string;
	queryKey: QueryKeyType;
	params: IListQueryParams;
}

export const useGetMasterfilesQuery = <TRow extends object>({
	endpoint,
	queryKey,
	params,
}: MasterfileQueryOptions) => {
	let baseKey: readonly unknown[];
	if (typeof queryKey === 'string') {
		baseKey = [queryKey];
	} else if (typeof queryKey === 'object' && queryKey !== null && 'list' in queryKey && typeof queryKey.list === 'function') {
		baseKey = queryKey.list();
	} else {
		baseKey = queryKey as readonly unknown[];
	}
	
	return useQuery<IListApiResponse<TRow>>({
		queryKey: [...baseKey, params],
		queryFn: async () => {
            const response = await masterfileApi.getList<TRow>(endpoint, params);
            console.log(response.data);
            return response.data;
		},
	});
};