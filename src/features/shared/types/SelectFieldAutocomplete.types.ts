import { ComponentProps } from "react";
import { Control, FieldPath, FieldValues } from "react-hook-form";
import { IListQueryParams, SelectFieldOption } from "./index";

export interface SelectFieldAutocompleteProps<TFieldValues extends FieldValues> extends Omit<ComponentProps<"select">, "name"> {
	name: FieldPath<TFieldValues>;
	control: Control<TFieldValues>;
	label?: string;
	error?: string;
	placeholder?: string;
	required?: boolean;
	onValueChange?: (value: string) => void;
	disabled?: boolean;
	slotProps?: { wrapper?: ComponentProps<"div"> };

	// API Configuration
	endpoint: string;
	queryKey: string;
	valueField?: string; // Field name in API response to use as value (default: "id" or first field)
	labelField?: string; // Field name in API response to use as label (default: "name" or second field)
	queryParams?: IListQueryParams; // Optional query parameters
	transformResponse?: (data: Record<string, unknown>[]) => SelectFieldOption[]; // Custom transform function
}

