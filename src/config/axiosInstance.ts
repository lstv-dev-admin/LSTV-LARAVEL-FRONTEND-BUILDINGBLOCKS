// Libs
import axios, { AxiosRequestHeaders } from 'axios';

// Utils
import toast from '@/lib/toast';
import { findMenuCodeFromPath } from '@/lib/menu-utils';
import { useMenuStore } from '@/stores/useMenuStore';

const axiosClient = axios.create({
	baseURL: import.meta.env.VITE_API_DEV_URL,
	headers: { "Content-Type": "application/json" },
	withCredentials: true,
	// timeout: 10 * 1000,
});

axiosClient.interceptors.request.use(
	(config) => {
		const current_path = window.location.pathname;
		const { menuTree: menu_tree } = useMenuStore.getState();
		const menu_code = findMenuCodeFromPath(current_path, menu_tree);

		if (menu_code) {
			if (!config.headers) {
				config.headers = {} as AxiosRequestHeaders;
			}

			(config.headers as AxiosRequestHeaders)["X-Menu-Code"] = menu_code;

			config.params = {
				menu_code,
				...(config.params ?? {}),
			};
		}

		return config;
	},
	(error) => Promise.reject(error)
);

axiosClient.interceptors.response.use(
	(response) => response,
	(error) => {
        if (error.code === 'ECONNABORTED' || error.code === 'ERR_NETWORK') {
			toast.error("Unable to connect to the server. Please check your internet connection or try again later.");
		}

		if (error?.response?.status === 401) {
			if (window.location.pathname !== '/login') {
				window.location.href = '/login';
			}
		}

		return Promise.reject(error);
	}
);

export default axiosClient;