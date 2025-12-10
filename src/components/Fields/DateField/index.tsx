import { ComponentProps } from 'react';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '../../ui/form';
import { FieldValues } from 'react-hook-form';
import { cn } from '@/lib/utils';
import { Props } from './types';
import DateInputWrapper from './components/DateInputWrapper';

const DateField = <TFieldValues extends FieldValues>({
	control,
	label,
	name,
	required,
	placeholder = "mm/dd/yyyy",
	dateFormat = "MM/dd/yyyy",
	valueFormat = "default",
	maxDate,
	minDate,
	slotProps,
	onChange,
	...props
}: Props<TFieldValues>) => {
	return (
		<FormField
			control={control}
			name={name}
			render={({ field, fieldState }) => (
				<FormItem {...slotProps?.wrapper} className={cn('space-y-1', slotProps?.wrapper?.className)}>
					{label && (
						<FormLabel className='flex gap-1 mb-2 w-fit'>
							{label}
							{required && <span className="text-destructive">*</span>}
						</FormLabel>
					)}
					<FormControl>
						<DateInputWrapper
							value={field.value}
							onChange={(value) => {
								field.onChange(value);
								onChange?.(value);
							}}
							placeholder={placeholder}
							dateFormat={dateFormat}
							valueFormat={valueFormat}
							error={!!fieldState.error?.message}
							disabled={props.disabled}
							className={props?.className}
							maxDate={maxDate}
							minDate={minDate}
						/>
					</FormControl>
					<FormMessage />
				</FormItem>
			)}
		/>
	);
};

export default DateField;