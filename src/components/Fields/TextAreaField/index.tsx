import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { ComponentProps } from "react";
import { Control, FieldPath, FieldValues } from "react-hook-form";

interface Props<TFieldValues extends FieldValues> 
extends ComponentProps<"textarea"> {
    name: FieldPath<TFieldValues>;
    control: Control<TFieldValues>;
	label?: string;
	error?: string;
    required?: boolean;
    slotProps?: { wrapper?: ComponentProps<"div">}
}

const TextAreaField = <TFieldValues extends FieldValues>({
	name,
	control,
	label,
	error,
	required,
	className,
    slotProps,
	...props
}: Props<TFieldValues>) => {
	return (
		<FormField
			control={control}
			name={name}
			render={({ field, fieldState }) => (
				<FormItem {...slotProps} className={cn('space-y-1', slotProps?.wrapper?.className)}>
					{label && (
						<FormLabel className="flex gap-1 w-fit mb-2">
							{label}
							{required && <span className="text-destructive">*</span>}
						</FormLabel>
					)}
					<FormControl>
						<Textarea
							{...field}
							{...props}
							className={cn(
								fieldState.error?.message && "border-destructive ring-destructive focus-visible:ring-destructive/50",
								className,
							)}
						/>
					</FormControl>
					<FormMessage />
				</FormItem>
			)}
		/>
	);
};

export default TextAreaField;