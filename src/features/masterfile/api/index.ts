// Features
import { getMasterfileUrl } from "@features/masterfile/utils/index";
import { fileApi } from "@features/shared/api";
import { IListApiResponse, IListQueryParams, IBaseResponse } from "@features/shared/types";

// Utils
import axiosClient from "@/config/axiosInstance";

const isFileValue = (value: unknown): value is File => value instanceof File;

const containsFile = (payload: Record<string, unknown>) => {
	return Object.values(payload).some((value) => {
		if (isFileValue(value)) {
			return true;
		}

		if (Array.isArray(value)) {
			return value.some((item) => isFileValue(item));
		}

		return false;
	});
};

const buildFormData = (payload: Record<string, unknown>) => {
	const formData = new FormData();

	Object.entries(payload).forEach(([key, value]) => {
		if (value === undefined || value === null) {
			return;
		}

		if (isFileValue(value)) {
			formData.append(key, value);
			return;
		}

		if (Array.isArray(value)) {
			value.forEach((item) => {
				if (isFileValue(item)) {
					formData.append(`${key}[]`, item);
				} else {
					formData.append(`${key}[]`, String(item));
				}
			});
			return;
		}

		formData.append(key, String(value));
	});

	return formData;
};

const getPayloadConfig = (payload: Record<string, unknown>) => {
	if (!containsFile(payload)) {
		return { data: payload, headers: {} };
	}

	return {
		data: buildFormData(payload),
		headers: { "Content-Type": "multipart/form-data" },
	};
};

export const masterfileApi = {
	getList: <TRow extends object>(endpoint: string, params?: IListQueryParams) => {
		return axiosClient.get<IListApiResponse<TRow>>(getMasterfileUrl(endpoint), { params });
	},

	download: (endpoint: string, id: number | string) => {
		return fileApi.download(getMasterfileUrl(`${endpoint}/download`, id));
	},

	create: <TFormData extends Record<string, unknown>, TResponse = TFormData>(
		endpoint: string,
		payload: TFormData,
	) => {
		const { data, headers } = getPayloadConfig(payload);
		return axiosClient.post<IBaseResponse<TResponse>>(getMasterfileUrl(endpoint), data, { headers });
	},

	import: <TFormData extends Record<string, unknown>, TResponse = TFormData[]>(
		endpoint: string,
		payload: TFormData[],
	) => {
		return axiosClient.post<IBaseResponse<TResponse>>(getMasterfileUrl(`${endpoint}/import`), payload);
	},

	update: <TFormData extends Record<string, unknown>, TResponse = TFormData>(
		endpoint: string,
		id: number | string,
		payload: TFormData,
	) => {
		const { data, headers } = getPayloadConfig(payload);

		return axiosClient.put<IBaseResponse<TResponse>>(getMasterfileUrl(endpoint, id), data, { headers });
	},

	delete: <TResponse = null>(endpoint: string, id: number | string) => {
		return axiosClient.delete<IBaseResponse<TResponse>>(getMasterfileUrl(endpoint, id));
	},

	export: (endpoint: string) => {
		return fileApi.export(getMasterfileUrl(endpoint));
	},
    
	print: (endpoint: string) => {
		return fileApi.print(getMasterfileUrl(endpoint));
	},
};