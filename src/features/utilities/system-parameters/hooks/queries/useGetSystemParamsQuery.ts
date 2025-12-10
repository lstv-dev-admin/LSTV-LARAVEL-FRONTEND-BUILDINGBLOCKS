import { useQuery } from "@tanstack/react-query";
import systemParametersApi from "../../api";
import QUERY_KEYS from "@/constants/query-keys";

export const useGetSystemParamsQuery = () => {
    return useQuery({
        queryKey: QUERY_KEYS.UTILITIES.SYSTEM_PARAMETERS,
        queryFn: async () => {
            const response = await systemParametersApi.get();
            return response.data;
        }
    });
}