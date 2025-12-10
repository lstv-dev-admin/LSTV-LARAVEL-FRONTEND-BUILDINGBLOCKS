import { UseFormSetError, FieldValues } from "react-hook-form";
import { applyBackendErrorsToForm } from "@features/shared/utils/formError";
import toast from "@/lib/toast";

export function handleFormError<T extends FieldValues>(
    err: unknown,
    setError: UseFormSetError<T>,
    toastId?: string | number,
    fallbackMessage = "Something went wrong"
) {
    const maybeAxios = err as { response?: { data?: { message?: unknown } } };
    const payload = maybeAxios?.response?.data?.message as Record<string, unknown> | undefined;

    if (payload && typeof payload === "object") {
        applyBackendErrorsToForm(setError, payload as Record<string, string[] | string>);
    }

    toast.error(fallbackMessage, { id: toastId });
}

