// Features
import { IBaseResponse, IListApiResponse, IListQueryParams, SelectFieldOption } from "../types";

// Utils
import axiosClient from "@/config/axiosInstance";

type ApiResponseData = Record<string, string | number | boolean | null | undefined>;

type SelectFieldOptionsResponse =
	| IListApiResponse<ApiResponseData>
	| IBaseResponse<ApiResponseData[]>
	| SelectFieldOption[]
	| ApiResponseData[];

export const selectFieldOptionsApi = {
	getOptions: (endpoint: string, params?: IListQueryParams) => {
		return axiosClient.get<SelectFieldOptionsResponse>(endpoint, {
			params,
		});
	},
};

