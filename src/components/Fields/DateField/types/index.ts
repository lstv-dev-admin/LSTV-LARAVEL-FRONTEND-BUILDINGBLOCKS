import { ComponentProps } from 'react';
import { Control, FieldPath, FieldValues } from 'react-hook-form';

export type ValueFormat = 'default' | 'yyyy-mm-dd' | 'dd-mm-yyyy' | 'mm-dd-yyyy';

export interface DateInputProps {
	value: Date | string | null | undefined;
	onChange: (date: Date | string | null) => void;
	placeholder?: string;
	dateFormat?: string;
	valueFormat?: ValueFormat;
	error?: boolean;
	disabled?: boolean;
	className?: string;
	id?: string;
	maxDate?: Date | 'today' | null;
	minDate?: Date | 'today' | null;
}

export interface Props<TFieldValues extends FieldValues> extends Omit<ComponentProps<'input'>, 'onChange'> {
	name: FieldPath<TFieldValues>;
	control: Control<TFieldValues>;
	label?: string;
	error?: string;
	required?: boolean;
	dateFormat?: string;
	valueFormat?: ValueFormat;
	maxDate?: Date | 'today' | null;
	minDate?: Date | 'today' | null;
	slotProps?: { wrapper?: ComponentProps<"div"> };
	onChange?: (value: Date | string | null) => void;
}

