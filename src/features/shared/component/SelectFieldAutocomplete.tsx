import { FieldValues } from "react-hook-form";
import SelectField from "@/components/Fields/SelectField";
import { SelectFieldAutocompleteProps } from "../types/SelectFieldAutocomplete.types";
import useSelectFieldOptions from "../hooks/queries/useSelectFieldOptions";

const SelectFieldAutocomplete = <TFieldValues extends FieldValues>({
	name,
	control,
	label,
	error,
	placeholder = "Select option",
	required,
	onValueChange,
	disabled,
	slotProps,
	endpoint,
	queryKey,
	valueField = "id",
	labelField = "name",
	queryParams,
	transformResponse,
}: SelectFieldAutocompleteProps<TFieldValues>) => {
	const { data: options = [], isLoading, isError } = useSelectFieldOptions({
		endpoint,
		queryKey,
		valueField,
		labelField,
		queryParams,
		transformResponse,
	});

	return (
		<SelectField
			name={name}
			control={control}
			label={label}
			error={error}
			values={options}
			placeholder={isLoading ? "Loading..." : placeholder}
			required={required}
			onValueChange={onValueChange}
			disabled={disabled || isLoading || isError}
			slotProps={slotProps}
		/>
	);
};

export default SelectFieldAutocomplete;

