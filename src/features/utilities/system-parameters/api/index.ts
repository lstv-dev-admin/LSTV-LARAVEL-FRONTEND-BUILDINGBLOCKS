import axiosClient from "@/config/axiosInstance";
import { IBaseResponse } from "@/features/shared";
import { ISystemParameter } from "../types";
import { SystemParameterFormData } from "../schema";

const systemParametersApi = {
    get: () => axiosClient.get<IBaseResponse<ISystemParameter>>('/utilities/system-parameter'),
    update: (data: SystemParameterFormData) => axiosClient.put<IBaseResponse<ISystemParameter>>('/utilities/system-parameter', data),
}

export default systemParametersApi;