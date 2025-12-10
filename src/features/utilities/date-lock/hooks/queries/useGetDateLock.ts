import dateLockApi from "../../api";
import { useQuery } from "@tanstack/react-query";
import QUERY_KEYS from "@/constants/query-keys";

export const useGetDateLockQuery = () => {
    return useQuery({
        queryKey: QUERY_KEYS.UTILITIES.DATE_LOCK,
        queryFn: async () => {
            const { data } = await dateLockApi.get();
            return data;
        },
    });
};