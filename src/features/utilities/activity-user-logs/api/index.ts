import { IUserActivityLog, IUserActivityLogParams } from "../types";
import axiosClient from "@/config/axiosInstance";
import { IListApiResponse } from "@/features/shared";

export const userActivityLogsApi = {
    getList: (params?: IUserActivityLogParams) => {
        return axiosClient.get<IListApiResponse<IUserActivityLog>>("/utilities/user-activity-log", { params });
    },
};