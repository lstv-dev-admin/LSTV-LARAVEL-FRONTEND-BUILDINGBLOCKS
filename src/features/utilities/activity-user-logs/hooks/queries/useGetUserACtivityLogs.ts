import { useQuery } from "@tanstack/react-query";
import { IUserActivityLog, IUserActivityLogParams } from "../../types";
import { userActivityLogsApi } from "../../api";

export const useGetUserActivityLogs = (params?: IUserActivityLogParams) => {
    return useQuery({
        queryKey: ["user-activity-logs", params],
        queryFn: async () => {
            const { data } = await userActivityLogsApi.getList(params);
            return data;
        },
    });
};