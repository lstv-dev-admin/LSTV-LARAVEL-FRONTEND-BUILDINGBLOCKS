import { Control, FieldPath, FieldValues } from "react-hook-form";

// Features
import { IMasterFileField } from "../types";
import SelectFieldAutocomplete from "@features/shared/component/SelectFieldAutocomplete";

// Components
import InputField from "@/components/Fields/InputField";

interface MasterfileFieldProps<TFieldValues extends FieldValues> {
	field: IMasterFileField;
	name: FieldPath<TFieldValues>;
	control: Control<TFieldValues>;
	error?: string;
}

const MasterfileField = <TFieldValues extends FieldValues>({
	field,
	name,
	control,
	error,
}: MasterfileFieldProps<TFieldValues>) => {
	const hasAutocomplete =
		field.autocomplete === true ||
		(typeof field.autocomplete === "object" && field.autocomplete !== null);

	// Handle autocomplete fields
	if (hasAutocomplete && typeof field.autocomplete === "object") {
		return (
			<SelectFieldAutocomplete
				name={name}
				control={control}
				label={field.label}
				placeholder={field.placeholder ?? ""}
				required={field.required}
				endpoint={field.autocomplete.endpoint}
				queryKey={field.autocomplete.queryKey}
				valueField={field.autocomplete.valueField}
				labelField={field.autocomplete.labelField}
				queryParams={field.autocomplete.queryParams}
				transformResponse={field.autocomplete.transformResponse}
			/>
		);
	}

	// Handle regular input fields
	const { autocomplete, ...inputProps } = field;

	return (
		<InputField
			{...inputProps}
			name={name}
			control={control}
			label={field.label}
			error={error}
			placeholder={field.placeholder ?? ""}
			required={field.required}
		/>
	);
};

export default MasterfileField;

