// Features
import { masterfileApi } from "@features/masterfile/api";

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

const useDeleteItemMutation = ({
	endpoint,
	queryKey,
	primaryKey,
	invalidateQueryKeys = [],
}: MasterfileMutationConfig) => {
	return useMutation({
		mutationFn: async (id: number | string) => {
			return await masterfileApi.delete(endpoint, id);
		},
		onSuccess: () => {
			invalidateQueries(queryKey, primaryKey, invalidateQueryKeys);
		},
	});
};

export default useDeleteItemMutation;