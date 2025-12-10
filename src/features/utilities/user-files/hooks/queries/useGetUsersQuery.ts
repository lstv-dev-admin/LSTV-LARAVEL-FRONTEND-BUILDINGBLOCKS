import { useQuery } from "@tanstack/react-query";
import { userApi } from "@/features/utilities/user-files/api";
import { IListQueryParams } from "@/features/shared";

export const useGetUsersQuery = (params?: IListQueryParams) => {
	return useQuery({
		queryKey: ["user-list", params],
		queryFn: async () => {
			const { data } = await userApi.getList(params);
			return data;
		},
		refetchOnMount: true,
		refetchOnWindowFocus: false,
		placeholderData: (data) => data,
		// staleTime: 0,
	});
};