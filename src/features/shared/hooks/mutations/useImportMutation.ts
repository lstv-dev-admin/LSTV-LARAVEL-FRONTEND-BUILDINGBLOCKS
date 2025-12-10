// Utils
import toast from "@/lib/toast";
import useConfirmStore from "@/stores/useConfirmStore";
import { parseExcelToSchema } from "@/utils/parse-excel-to-schema";

// Libs
import { useMutation } from "@tanstack/react-query";
import { z } from "@/lib/validation";

interface UseImportMutationConfig<TFormData extends Record<string, unknown>> {
	title: string;
	schema: z.ZodType<TFormData>;
	importFn: (rows: TFormData[]) => Promise<{ data: { message?: string } }>;
	onSuccess?: (response: unknown) => void;
}

const formatErrorMessage = (value: unknown): string => {
	if (typeof value === "string") {
		return value;
	}

	if (Array.isArray(value)) {
		return value
			.map((item) => formatErrorMessage(item))
			.filter((item) => Boolean(item))
			.join("\n");
	}

	if (value && typeof value === "object") {
		return Object.values(value)
			.map((item) => formatErrorMessage(item))
			.filter((item) => Boolean(item))
			.join("\n");
	}

	return "";
};

export const useImportMutation = <TFormData extends Record<string, unknown>>({
	title,
	schema,
	importFn,
	onSuccess,
}: UseImportMutationConfig<TFormData>) => {
	const { confirm, setLoading, close } = useConfirmStore();

	return useMutation({
		mutationFn: async (file: File) => {
			const confirmed = await confirm({
				title: "Import Masterfile Items",
				description: "Are you sure you want to import the masterfile items?",
			});

			if (!confirmed) {
				throw new Error("Import cancelled by user");
			}

			setLoading(true);
			const toastId = toast.loading(`Importing ${title}...`);

			try {
				const rows = await parseExcelToSchema<TFormData>({
					file,
					schema: schema as unknown as z.ZodType<TFormData>,
				});

				const response = await importFn(rows);

				toast.success(response.data.message || `${title} successfully imported!`, { id: toastId });
				return { data: response.data, toastId };
			} catch (error: unknown) {
				const status = (error as { response?: { status?: number } })?.response?.status;
				const serverMessage = (error as { response?: { data?: { message?: unknown } } })?.response?.data?.message;

				console.log(status, serverMessage);

				if (status === 409) {
					const message = typeof serverMessage === "string" ? serverMessage : "Import complete — all records already exist in the system.";
					toast.info(message, { id: toastId });
					throw error;
				}

				const rawMessage = error instanceof Error ? error.message : "";
				const normalizedMessage = rawMessage.toLowerCase();
				const formattedServerMessage = formatErrorMessage(serverMessage);
				const isStructuredServerMessage =
					Boolean(serverMessage) && typeof serverMessage === "object";

				if (
					normalizedMessage.includes("unrecognized key") ||
					normalizedMessage.includes("no valid rows found")
				) {
					toast.error(`Incorrect template detected. Please use the ${title} template.`, { id: toastId });
					throw error;
				}

				const fallbackMessage = isStructuredServerMessage
					? "The imported data is invalid. Please verify the template."
					: formattedServerMessage || rawMessage || "Import failed.";
				toast.error(fallbackMessage, { id: toastId });
				throw error;
			} finally {
				close();
				setLoading(false);
			}
		},
		onSuccess: (data) => {
			onSuccess?.(data.data);
		},
	});
};

export default useImportMutation;

