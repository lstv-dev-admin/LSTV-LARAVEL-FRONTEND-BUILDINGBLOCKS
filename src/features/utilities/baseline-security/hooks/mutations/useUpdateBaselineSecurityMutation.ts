import { useMutation } from "@tanstack/react-query";
import baselineSecurityApi from "../../api";
import { BaselineSecurityFormData } from "../../schemas";
import { queryClient } from "@/config/reactQueryClient";
import QUERY_KEYS from "@/constants/query-keys";

export const useUpdateBaselineSecurityMutation = () => {
    return useMutation({
        mutationFn: (data: BaselineSecurityFormData) => baselineSecurityApi.update(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: QUERY_KEYS.UTILITIES.BASELINE_SECURITY });
        },
        onError: (error) => {
            console.error(error);
        },
    })
};

