import { UseFormReturn, Path, PathValue } from "react-hook-form";

export const resetFormValues = <T extends Record<string, unknown>>(
	form: UseFormReturn<T>,
	values: Partial<T>,
	options?: {
		shouldDirty?: boolean;
		shouldValidate?: boolean;
		shouldTouch?: boolean;
	}
) => {
	(Object.keys(values) as Array<keyof T>).forEach((key) => {
		const value = values[key];
		if (value !== undefined) {
			form.setValue(key as Path<T>, value as PathValue<T, Path<T>>, options);
		}
	});
};

