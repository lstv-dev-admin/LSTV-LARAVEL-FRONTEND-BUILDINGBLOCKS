import axiosClient from "@/config/axiosInstance";
import { IBaseResponse, IListApiResponse, IListQueryParams } from "@/features/shared";
import { IUserFiles, IUserStatus, IUserType } from "@features/utilities/user-files/types";
import axios from "axios";
import { UserFormData } from "@features/utilities/user-files/schema";

export const userApi = {
    getList: (params?: IListQueryParams) => {
        return axiosClient.get<IListApiResponse<IUserFiles>>("/utilities/user-files", { params });
    },
    addUser: (payload: UserFormData) => {
        return axiosClient.post<IUserFiles>("/utilities/user-files", payload);
    },
    updateUser: (id: number, payload: UserFormData) => {
        return axiosClient.put<IBaseResponse<IUserFiles>>(`/utilities/user-files/${id}`, payload);
    },
    deleteUser: (id: number) => {
        return axiosClient.delete<IBaseResponse<IUserFiles>>(`/utilities/user-files/${id}`);
    },
    getUserType: () => {
        return axiosClient.get<IBaseResponse<IUserType[]>>("/utilities/user-type");
    },
    getUserStatus: () => {
        return axios.get<IBaseResponse<IUserStatus[]>>("/utilities/user-files/status");
    }
}