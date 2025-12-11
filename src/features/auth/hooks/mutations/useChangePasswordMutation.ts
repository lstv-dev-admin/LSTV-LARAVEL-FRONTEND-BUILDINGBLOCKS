import { authenticationApi } from "../../api";
import { useMutation } from "@tanstack/react-query";
import { ChangePasswordFormData } from "../../schema";

export const useChangePasswordMutation = () => {
    return useMutation({
        mutationFn: async (payload: ChangePasswordFormData) => {
            const { data } = await authenticationApi.changePassword(payload);
            return data.data;
        },
    });
}

