import { FieldValues, Path, UseFormSetError } from "react-hook-form";

export type BackendValidation = Record<string, string[] | string>;

export function applyBackendErrorsToForm<TFieldValues extends FieldValues>(
	setError: UseFormSetError<TFieldValues>,
	errors: BackendValidation
): void {
	Object.entries(errors).forEach(([key, value]) => {
		const messages = Array.isArray(value) ? value : [value];
		const message = messages.filter(Boolean).join("\n");
		try {
			setError(key as Path<TFieldValues>, { type: "server", message });
		} catch {
			// If field does not exist in the current form, safely ignore.
		}
	});
}

