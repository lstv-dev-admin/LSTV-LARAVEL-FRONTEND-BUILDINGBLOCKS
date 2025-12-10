// Utils
import axiosClient from "@/config/axiosInstance";

export const fileApi = {
	download: (endpoint: string) => {
		return axiosClient.get<Blob>(endpoint, {
			responseType: "blob",
		});
	},

	export: (endpoint: string) => {
		return axiosClient.get<Blob>(`${endpoint}/export`, {
			responseType: "blob",
		});
	},

	print: (endpoint: string) => {
		return axiosClient.get<Blob>(`${endpoint}/print`, {
			responseType: "blob",
		});
	},

	import: <TResponse = unknown>(endpoint: string, file: File | FormData) => {
		const formData = file instanceof FormData ? file : (() => {
			const fd = new FormData();
			fd.append('file', file);
			return fd;
		})();

		return axiosClient.post<TResponse>(`${endpoint}/import`, formData, {
			headers: { "Content-Type": "multipart/form-data" },
		});
	},
};

export default fileApi;