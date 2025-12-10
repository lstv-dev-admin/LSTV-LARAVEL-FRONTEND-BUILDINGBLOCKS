// Features
import { IAuthMeResponse } from "@features/auth/types";
import { IBaseResponse } from "@features/shared/types";
import { ChangePasswordFormData, LoginFormData } from "@features/auth/schema";

// Utils
import axiosClient from "@/config/axiosInstance";

export const authenticationApi = {
    me: () => axiosClient.get<IAuthMeResponse>('/auth/me'),
	login: (payload: LoginFormData) => 
        axiosClient.post<IBaseResponse<{ token: string }>>('/auth/login', payload),
    logout: () => axiosClient.post('/auth/logout'),
    changePassword: (payload: ChangePasswordFormData) => 
        axiosClient.put<IBaseResponse<unknown>>('/utilities/change-password', payload),
};