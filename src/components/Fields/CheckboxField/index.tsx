import { ComponentProps } from 'react';
import { Checkbox } from '../../ui/checkbox';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '../../ui/form';
import { Control, FieldPath, FieldValues } from 'react-hook-form';
import { cn } from '@/lib/utils';

interface Props<TFieldValues extends FieldValues> extends Omit<ComponentProps<typeof Checkbox>, 'checked'> {
	name: FieldPath<TFieldValues>;
	control: Control<TFieldValues>;
	label?: string;
	error?: string;
	required?: boolean;
	slotProps?: { wrapper?: ComponentProps<"div"> };
}

const CheckboxField = <TFieldValues extends FieldValues>({
	control,
	label,
	name,
	required,
	slotProps,
	onCheckedChange,
	...props
}: Props<TFieldValues>) => {
	return (
		<FormField
			control={control}
			name={name}
			render={({ field, fieldState }) => (
				<FormItem {...slotProps?.wrapper} className={cn('space-y-1', slotProps?.wrapper?.className)}>
					<div className="flex items-center gap-2">
						<FormControl>
							<Checkbox
								{...props}
								checked={field.value}
								onCheckedChange={(checked) => {
									field.onChange(checked);
									onCheckedChange?.(checked);
								}}
								className={cn(
									fieldState.error?.message && 'border-destructive/50 ring-destructive',
									props?.className,
								)}
							/>
						</FormControl>
						{label && (
							<FormLabel className={cn('font-normal cursor-pointer', required && 'after:content-["*"] after:text-destructive after:ml-1')}>
								{label}
							</FormLabel>
						)}
					</div>
					<FormMessage />
				</FormItem>
			)}
		/>
	);
};

export default CheckboxField;

