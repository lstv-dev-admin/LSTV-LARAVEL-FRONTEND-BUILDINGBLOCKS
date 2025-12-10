import { useQuery } from "@tanstack/react-query";
import { userApi } from "@features/utilities/user-files/api";

const useGetUserStatusQuery = () => {
	return useQuery({
		queryKey: ["user-status"],
		queryFn: async () => {
			const { data } = await userApi.getUserStatus();
			return data;
		},
	});
};

export default useGetUserStatusQuery;