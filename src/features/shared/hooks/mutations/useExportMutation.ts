// Features
import { fileApi } from "@features/shared/api";

// Utils
import toast from "@/lib/toast";

// Libs
import { useMutation } from "@tanstack/react-query";

interface UseExportMutationConfig {
	endpoint: string;
	title: string;
}

export const useExportMutation = ({ endpoint, title }: UseExportMutationConfig) => {
	return useMutation({
		mutationFn: async () => {
			const response = await fileApi.export(endpoint);
			return { blob: response.data, headers: response.headers };
		},
		onMutate: () => {
			const toastId = toast.loading(`Loading ${title} for export...`);
			return { toastId };
		},
		onSuccess: ({ blob, headers }, _variables, context) => {
			const toastId = context?.toastId;
			try {
				const url = window.URL.createObjectURL(blob);
				const link = document.createElement("a");
				link.href = url;
				
				const contentDisposition = headers["content-disposition"] || "";
				const filename = contentDisposition.includes("filename=") 
					? contentDisposition.split("filename=")[1]?.replace(/"/g, "").trim() || `${title}_export.xlsx` 
					: `${title}_export.xlsx`;
				
				link.download = filename;
				document.body.appendChild(link);
				link.click();
				document.body.removeChild(link);
				window.URL.revokeObjectURL(url);
				
				toast.success(`${title} successfully exported!`, { id: toastId });
			} catch (error) {
				console.error("[useExportMutation] Error downloading file:", error);
				toast.error(`Failed to download ${title} export. Please try again.`, { id: toastId });
			}
		},
		onError: (_error, _variables, context) => {
			const toastId = context?.toastId;
			if (toastId) {
				toast.error(`Failed to export ${title}. Please try again.`, { id: toastId });
			} else {
				toast.error(`Failed to export ${title}. Please try again.`);
			}
		},
	});
};

export default useExportMutation;

