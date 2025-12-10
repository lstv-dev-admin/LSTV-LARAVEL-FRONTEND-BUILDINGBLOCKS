// Features
import { authenticationApi } from "../../api";

// Libs
import { useQuery } from "@tanstack/react-query";

export const useGetMeQuery = () => {
    return useQuery({
        queryKey: ['me'],
        queryFn: async () => {
            const response = await authenticationApi.me();
            return response.data;
        },
        retry: false,
        refetchOnMount: (query) => !query.state.error,
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
    });
}