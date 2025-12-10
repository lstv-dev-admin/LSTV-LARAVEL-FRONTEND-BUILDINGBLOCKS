import { IBaselineSecurity } from "../types";
import axiosClient from "@/config/axiosInstance";
import { IBaseResponse } from "@/features/shared";
import { BaselineSecurityFormData } from "../schemas";

const baselineSecurityApi = {
    get: () => {
        return axiosClient.get<IBaseResponse<IBaselineSecurity>>('/utilities/baseline-security');
    },
    update: (data: BaselineSecurityFormData) => {
        return axiosClient.post<IBaseResponse<IBaselineSecurity>>('/utilities/baseline-security', data);
    },
};

export default baselineSecurityApi;