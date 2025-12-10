import { useMutation } from "@tanstack/react-query";
import { userApi } from "@features/utilities/user-files/api";
import { queryClient } from "@/config/reactQueryClient";

export const useDeleteUserMutation = () => {
	return useMutation({
		mutationFn: (id: number) => userApi.deleteUser(id, {}),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["user-list"] });
		},
		onError: (error) => {
			console.error(error);
		},
	});
};

