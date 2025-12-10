import { useMutation } from "@tanstack/react-query"
import { SystemParameterFormData } from "../../schema"
import systemParametersApi from "../../api"
import { queryClient } from "@/config/reactQueryClient"
import QUERY_KEYS from "@/constants/query-keys"

export const useSystemParameterMutation = () => {
    return useMutation({
        mutationFn: (data: SystemParameterFormData) => systemParametersApi.update(data),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: QUERY_KEYS.UTILITIES.SYSTEM_PARAMETERS }),   
        onError: (error) => console.error(error),
    })
}