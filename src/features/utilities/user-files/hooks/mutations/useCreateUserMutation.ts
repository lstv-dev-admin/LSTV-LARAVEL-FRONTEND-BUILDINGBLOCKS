import { useMutation } from "@tanstack/react-query";
import { userApi } from "@features/utilities/user-files/api";
import { queryClient } from "@/config/reactQueryClient";
import { UserFormData } from "@features/utilities/user-files/schema";

export const useCreateUserMutation = () => {
	return useMutation({
		mutationFn: (payload: UserFormData) =>
			userApi.addUser(payload),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["user-list"] });
		},
		onError: (error: unknown) => {
			console.error(error);
		}
	});
};