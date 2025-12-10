import { ComponentProps, ReactNode, useState } from 'react'
import { Input } from '../../ui/input';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '../../ui/form';
import { Control, FieldPath, FieldValues } from 'react-hook-form';
import { Eye, EyeOff } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Props<TFieldValues extends FieldValues> 
extends Omit<ComponentProps<'input'>, 'onChange'> {
    name: FieldPath<TFieldValues>;
    control: Control<TFieldValues>;
    label?: string;
    error?: string;
    required?: boolean;
    icon?: ReactNode;
    formatter?: (value: string) => string;
    slotProps?: { wrapper?: ComponentProps<"div">};
    onChange?: (value: string) => void;
}

const InputField = <TFieldValues extends FieldValues>({ 
    control, 
    label, 
    error, 
    name, 
    required, 
    icon, 
    formatter,
    slotProps,
    onChange,
    ...props
}: Props<TFieldValues>) => {

    const [view, setView] = useState(false);
    const { type } = props;
    
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
                    <div className='relative'>
                        {icon && (
                            <span className="absolute left-2 top-1/2 -translate-y-1/2 pointer-events-none">
                                {icon}
                            </span>
                        )}
                        <FormControl>
                            <Input 
                                {...field} 
                                {...props}
                                {...(type === "file" ? { value: undefined } : {})}
                                onChange={(e) => {
                                    if (type === "file") {
                                        const file = e.target.files?.[0];
                                        if (file) field.onChange(file);
                                    } else {
                                        let value = e.target.value;
                                        if (formatter) value = formatter(value);
                                        field.onChange(value);
                                        onChange?.(value);
                                    }
                                }}
                                type={type === "password" ? (view ? "text" : "password") : type}
                                className={cn(
                                    fieldState.error?.message && 'border-destructive/50 ring-destructive focus-visible:ring-destructive/50',
                                    icon && 'pl-7',
                                    type === "password" && "pr-7",
                                    props?.className,
                                )}
                            />
                        </FormControl>
                        {type === 'password' && (
                            <button
                                type="button"
                                onClick={() => setView(!view)}
                                className={cn(
                                    'absolute right-3 top-1/2 -translate-y-1/2 transition', 
                                    props?.disabled && 'pointer-events-none opacity-50'
                                )}
                            >
                                {view ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                            </button>
                        )}
                    </div>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
};

export default InputField;