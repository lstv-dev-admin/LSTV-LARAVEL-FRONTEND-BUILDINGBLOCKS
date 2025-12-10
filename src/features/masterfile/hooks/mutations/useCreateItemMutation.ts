// Features
import { masterfileApi } from "@features/masterfile/api";
import { IListApiResponse } from "@/features/shared";

// Utils
import { queryClient } from "@/config/reactQueryClient";

// Libs
import { useMutation } from "@tanstack/react-query";

type QueryKeyType = string | readonly unknown[] | { list: () => readonly unknown[] };

interface MasterfileMutationConfig {
	endpoint: string;
	queryKey: QueryKeyType;
	primaryKey: string;
	invalidateQueryKeys?: QueryKeyType[];
}

const getQueryKeyArray = (queryKey: QueryKeyType): readonly unknown[] => {
	if (typeof queryKey === 'string') {
		return [queryKey];
	}
	if (typeof queryKey === 'object' && queryKey !== null && 'list' in queryKey && typeof queryKey.list === 'function') {
		// It's a query key constant, get the base path (without "list")
		const listKey = queryKey.list();
		// Remove the last element ("list") to get the base path
		return listKey.slice(0, -1);
	}
	return queryKey as readonly unknown[];
};

const invalidateQueries = (
	queryKey: QueryKeyType,
	primaryKey: string,
	invalidateQueryKeys: QueryKeyType[] = []
) => {
	const baseKey = getQueryKeyArray(queryKey);
	
	// Invalidate the base query key (which will invalidate all variants like list, detail, etc.)
	queryClient.invalidateQueries({ queryKey: baseKey });
	
	// Also invalidate any additional query keys
	invalidateQueryKeys.forEach((key) => {
		const keyArray = getQueryKeyArray(key);
		queryClient.invalidateQueries({ queryKey: keyArray });
	});
};

const useCreateItemMutation = <TFormData extends Record<string, unknown>>({
	endpoint,
	queryKey,
	primaryKey,
	invalidateQueryKeys = [],
}: MasterfileMutationConfig) => {
	return useMutation<Record<string, unknown>, unknown, TFormData>({
		mutationFn: async (payload: TFormData) => {
			const response = await masterfileApi.create(endpoint, payload);
			return response.data.data ?? payload;
		},
		onSuccess: (createdItem) => {
			// queryClient.setQueriesData(
			// 	{ queryKey: [queryKey] },
			// 	(oldData?: IListApiResponse<Record<string, unknown>>) => {
			// 		if (!oldData) {
			// 			return oldData;
			// 		}

			// 		return {
			// 			...oldData,
			// 			data: {
			// 				...oldData.data,
			// 				items: [
			// 					createdItem as Record<string, unknown>,
			// 					...oldData.data.items,
			// 				],
			// 			},
			// 		};
			// 	},
			// );

			invalidateQueries(queryKey, primaryKey, invalidateQueryKeys);
		},
	});
};

export default useCreateItemMutation;