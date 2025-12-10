// Features
import { fileApi } from "@features/shared/api";

// Utils
import toast from "@/lib/toast";
import { downloadBlob } from "@/utils/download-blob";

// Libs
import { useMutation } from "@tanstack/react-query";

interface UseDownloadMutationConfig {
	filename?: string;
}

interface DownloadParams {
	endpoint: string;
	filename?: string;
	errorMessage?: string;
}

export const useDownloadMutation = ({ filename: defaultFilename }: UseDownloadMutationConfig = {}) => {
	return useMutation({
		mutationFn: async ({ endpoint, filename, errorMessage }: DownloadParams) => {
			if (!endpoint) {
				throw new Error(errorMessage || "Download link unavailable. Please re-upload the file.");
			}

			const response = await fileApi.download(endpoint);
			return { blob: response.data, filename: filename || defaultFilename || "download" };
		},
		onMutate: () => {
			const toastId = toast.loading("Preparing download...");
			return { toastId };
		},
		onSuccess: ({ blob, filename }, _variables, context) => {
			const toastId = context?.toastId;
			try {
				downloadBlob(blob, filename);
				toast.success("Download started.", { id: toastId });
			} catch (error) {
				console.error("[useDownloadMutation] Error downloading file:", error);
				toast.error("Failed to download file.", { id: toastId });
			}
		},
		onError: (error, _variables, context) => {
			const toastId = context?.toastId;
			const errorMessage = error instanceof Error ? error.message : "Failed to download file.";
			
			if (toastId) {
				toast.error(errorMessage, { id: toastId });
			} else {
				toast.error(errorMessage);
			}
		},
	});
};

export default useDownloadMutation;

