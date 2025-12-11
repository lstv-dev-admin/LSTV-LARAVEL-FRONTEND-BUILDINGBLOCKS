import { useMutation, useQueryClient } from "@tanstack/react-query";
import { authenticationApi } from "@/features/auth/api";

const useLogoutMutation = () => {
    const queryClient = useQueryClient();
    
    return useMutation({
        mutationFn: async () => {
            const { data } = await authenticationApi.logout();
            return data.data;
        },
        onSuccess: () => queryClient.clear(),
        onError: (error) => {
            console.error(error);
        },
    });
};

export default useLogoutMutation;

