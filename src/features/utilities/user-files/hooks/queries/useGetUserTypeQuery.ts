import { useQuery } from "@tanstack/react-query";
import { userApi } from "@/features/utilities/user-files/api";

export const useGetUserTypeQuery = () => {
	return useQuery({
		queryKey: ["user-roles"],
		queryFn: async () => {
			const { data } = await userApi.getUserType();
			return data;
		},
	});
};