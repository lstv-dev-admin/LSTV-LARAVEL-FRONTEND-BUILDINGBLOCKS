// Features
import { IBaseResponse } from "@/features/shared";
import { DateLockFormValues } from "../schema";

// Utils
import axiosClient from "@/config/axiosInstance";

const dateLockApi = {
    get: () => axiosClient.get<IBaseResponse<DateLockFormValues>>('/utilities/date-lock'),
    update: (data: DateLockFormValues) => axiosClient.put<IBaseResponse<DateLockFormValues>>('/utilities/date-lock', data),
};

export default dateLockApi;