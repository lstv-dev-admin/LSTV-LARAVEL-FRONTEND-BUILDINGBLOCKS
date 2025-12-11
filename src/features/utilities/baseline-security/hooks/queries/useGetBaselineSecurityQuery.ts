import { useQuery } from "@tanstack/react-query";
import baselineSecurityApi from "../../api";
import QUERY_KEYS from "@/constants/query-keys";

export const useGetBaselineSecurityQuery = () => {
    return useQuery({
        queryKey: QUERY_KEYS.UTILITIES.BASELINE_SECURITY,
        queryFn: async () => {
            const { data } = await baselineSecurityApi.get();
            return data;    
        },
    });
};

