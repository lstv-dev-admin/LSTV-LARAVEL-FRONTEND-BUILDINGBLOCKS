import { ComponentProps } from "react"

// Components
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Others
import { Control, FieldPath, FieldValues } from "react-hook-form";
import clsx from "clsx";
import { cn } from "@/lib/utils";

interface Props<TFieldValues extends FieldValues> extends ComponentProps<"select"> {
	name: FieldPath<TFieldValues>;
	control: Control<TFieldValues>;
	label?: string;
	error?: string;
	values: { value: string; label: string }[];
	placeholder?: string;
	required?: boolean;
	onValueChange?: (e: string) => void;
    slotProps?: { wrapper?: ComponentProps<"div">}
};

const SelectField = <TFieldValues extends FieldValues>({
	name,
	control,
	label,
	values = [],
	required,
	placeholder = "Select option",
	onValueChange,
	disabled,
    slotProps
}: Props<TFieldValues>) => {
	return (
		<FormField
			control={control}
			name={name}
			render={({ field, fieldState }) => (
				<FormItem {...slotProps?.wrapper} className={cn("space-y-2", slotProps?.wrapper?.className)}>
					{label && (
						<FormLabel className="flex gap-1 w-fit">
							{label}
							{required && <span className="text-destructive">*</span>}
						</FormLabel>
					)}
					<Select
						onValueChange={(value) => {
							field.onChange(value);
							onValueChange?.(value);
						}}
						value={field.value}
						defaultValue={field.value}
						disabled={disabled}
					>
						<FormControl>
							<SelectTrigger
								className={clsx(
									fieldState.error &&
										"border-destructive ring-destructive focus-visible:ring-destructive",
								)}
							>
								<SelectValue placeholder={placeholder} />
							</SelectTrigger>
						</FormControl>
                        <SelectContent>
                            <SelectGroup>
                                {values.length > 0 ? (
                                    values.map(({ value, label: optionLabel }) => (
                                        <SelectItem key={value} value={value}>
                                            {optionLabel}
                                        </SelectItem>
                                    ))
                                ) : (
                                    <SelectItem disabled value="__none">
                                        No options available
                                    </SelectItem>
                                )}
                            </SelectGroup>
                        </SelectContent>
					</Select>
					<FormMessage />
				</FormItem>
			)}
		/>
	);
};

export default SelectField;