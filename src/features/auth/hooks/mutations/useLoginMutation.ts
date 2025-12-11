// Features
import { authenticationApi } from "@/features/auth/api";
import { LoginFormData } from "@features/auth/schema";

// Libs
import { AxiosError } from "axios";
import { useMutation } from "@tanstack/react-query";
import { queryClient } from "@/config/reactQueryClient";

export interface LoginResult {
	token: string;
}

const useLoginMutation = () => {
    return useMutation<LoginResult, AxiosError, LoginFormData>({
        mutationFn: async (payload) => {
            const { data } = await authenticationApi.login(payload);
            return data.data;
        },
        retry: false,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['me'] });
            queryClient.invalidateQueries({ queryKey: ['menu-list-query'] });
        },
    });
};

export default useLoginMutation;

