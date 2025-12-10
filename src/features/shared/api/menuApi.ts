// Features
import { IMenuItem, ApiMenuItem } from "@features/shared/types";

// Utils
import axiosClient from "@/config/axiosInstance";

export const menuApi = {
	getMenu: () => {
		return axiosClient.get<IMenuItem[]>("/menu");
	},
	getMenuWithActions: () => {
		return axiosClient.get<ApiMenuItem[]>("/menu-with-actions");
	},
};