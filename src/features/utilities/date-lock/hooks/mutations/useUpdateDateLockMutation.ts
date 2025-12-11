import { queryClient } from "@/config/reactQueryClient";
import { useMutation } from "@tanstack/react-query";
import dateLockApi from "../../api";
import { DateLockFormValues } from "../../schema";
import QUERY_KEYS from "@/constants/query-keys";

export const useUpdateDateLockMutation = () => {
    return useMutation({
        mutationFn: (data: DateLockFormValues) => dateLockApi.update(data),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: QUERY_KEYS.UTILITIES.DATE_LOCK }),
        onError: (error: unknown) => console.error(error),
    });
};

