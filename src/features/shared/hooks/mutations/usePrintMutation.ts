// Features
import { fileApi } from "@features/shared/api";

// Utils
import toast from "@/lib/toast";

// Libs
import { useMutation } from "@tanstack/react-query";

interface UsePrintMutationConfig {
	endpoint: string;
	title: string;
}

export const usePrintMutation = ({ endpoint, title }: UsePrintMutationConfig) => {
	return useMutation({
		mutationFn: async () => {
			const response = await fileApi.print(endpoint);
			return response.data;
		},
		onMutate: () => {
			const toastId = toast.loading(`Loading ${title} for printing...`);
			return { toastId };
		},
		onSuccess: (blob, _variables, context) => {
			const toastId = context?.toastId;
			const blobUrl = window.URL.createObjectURL(blob);
			const iframe = document.createElement("iframe");
			
			iframe.style.position = "fixed";
			iframe.style.top = "50%";
			iframe.style.left = "50%";
			iframe.style.marginTop = "-1px";
			iframe.style.marginLeft = "-1px";
			iframe.style.width = "1px";
			iframe.style.height = "1px";
			iframe.style.border = "none";
			iframe.style.opacity = "0";
			iframe.style.pointerEvents = "none";
			iframe.style.zIndex = "-1";
			
			let hasTriggered = false;
			
			const triggerPrint = () => {
				if (hasTriggered) return;
				hasTriggered = true;
				
				setTimeout(() => {
					try {
						if (iframe.contentWindow && document.body.contains(iframe)) {
							iframe.contentWindow.focus();
							iframe.contentWindow.print();
							toast.success(`Opening ${title} print dialog...`, { id: toastId });
							
							setTimeout(() => {
								if (document.body.contains(iframe)) {
									document.body.removeChild(iframe);
								}
								window.URL.revokeObjectURL(blobUrl);
							}, 60000);
						}
					} catch (error) {
						console.error("[usePrintMutation] Print error:", error);
						if (document.body.contains(iframe)) {
							document.body.removeChild(iframe);
						}
						window.URL.revokeObjectURL(blobUrl);
						toast.error(`Failed to open print dialog. Please try again.`, { id: toastId });
					}
				}, 500);
			};
			
			iframe.onload = triggerPrint;
			iframe.src = blobUrl;
			document.body.appendChild(iframe);
			
			setTimeout(() => {
				if (!hasTriggered && document.body.contains(iframe)) {
					triggerPrint();
				}
			}, 2000);
		},
		onError: (_error, _variables, context) => {
			const toastId = context?.toastId;
			if (toastId) {
				toast.error(`Failed to load ${title} for printing. Please try again.`, { id: toastId });
			} else {
				toast.error(`Failed to load ${title} for printing. Please try again.`);
			}
		},
	});
};

export default usePrintMutation;