import { useState, useEffect, useRef, useCallback } from 'react';
import { CalendarIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { format, parse, isValid } from 'date-fns';
import { Calendar } from '../../../ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '../../../ui/popover';
import { Input } from '../../../ui/input';
import toast from '@/lib/toast';
import { DateInputProps } from '../types';
import { formatDateValue, parseDateValue, formatInputValue, getMaxDate, getMinDate, isDateDisabled } from '../utils';

const DateInput = ({ value, onChange, placeholder = "mm/dd/yyyy", dateFormat = "MM/dd/yyyy", valueFormat = "default", error, disabled, className, id, maxDate, minDate }: DateInputProps) => {
	const [inputValue, setInputValue] = useState<string>("");
	const [isOpen, setIsOpen] = useState(false);
	const [month, setMonth] = useState<Date>(new Date());
	const isClearingRef = useRef(false);

	const handleFormatDateValue = useCallback((date: Date | null) => {
		return formatDateValue(date, valueFormat, dateFormat);
	}, [valueFormat, dateFormat]);

	const handleParseDateValue = useCallback((val: Date | string | null | undefined) => {
		return parseDateValue(val, valueFormat, dateFormat);
	}, [valueFormat, dateFormat]);

	const handleOpenChange = (open: boolean) => {
		if (disabled && open) return;
		setIsOpen(open);
	};

	const getSelectedDate = (): Date | undefined => {
		if (!value) return undefined;
		const parsed = handleParseDateValue(value);
		return parsed || undefined;
	};

	useEffect(() => {
		if (value) {
			const date = handleParseDateValue(value);
			if (date && isValid(date)) {
				setInputValue(format(date, dateFormat));
				setMonth(date);
			} else {
				setInputValue("");
			}
		} else {
			setInputValue("");
		}
	}, [value, dateFormat, handleParseDateValue]);

	useEffect(() => {
		if (isOpen) {
			if (value) {
				const date = handleParseDateValue(value);
				if (date && isValid(date)) {
					setMonth(date);
				}
			}
		}
	}, [isOpen, value, handleParseDateValue]);

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const rawValue = e.target.value;
		const formatted = formatInputValue(rawValue);
		setInputValue(formatted);

		if (formatted.length === 10) {
			const parsedDate = parse(formatted, dateFormat, new Date());
			if (isValid(parsedDate)) {
				if (isDateDisabled(parsedDate, maxDate)) {
					toast.error("Date cannot be in the future");
					setInputValue("");
					onChange(null);
				} else {
					onChange(handleFormatDateValue(parsedDate));
				}
			} else {
				onChange(null);
			}
		} else {
			onChange(null);
		}
	};

	const handleInputBlur = () => {
		if (inputValue.length > 0 && inputValue.length < 10) {
			setInputValue("");
			onChange(null);
			toast.error("Invalid date format. Please enter a complete date (mm/dd/yyyy)");
		} else if (inputValue.length === 10) {
			const parsedDate = parse(inputValue, dateFormat, new Date());
			if (!isValid(parsedDate)) {
				setInputValue("");
				onChange(null);
				toast.error("Invalid date. Please enter a valid date");
			} else if (isDateDisabled(parsedDate, maxDate)) {
				setInputValue("");
				onChange(null);
				toast.error("Date cannot be in the future");
			}
		}
	};

	const handleCalendarSelect = (date: Date | undefined) => {
		if (isClearingRef.current) {
			return;
		}

		if (date && isValid(date)) {
			if (isDateDisabled(date, maxDate)) {
				toast.error("Date cannot be in the future");
				return;
			}
			
			const currentSelected = getSelectedDate();
			if (currentSelected) {
				const clickedDate = new Date(date);
				clickedDate.setHours(0, 0, 0, 0);
				const selectedDateOnly = new Date(currentSelected);
				selectedDateOnly.setHours(0, 0, 0, 0);
				
				if (clickedDate.getTime() === selectedDateOnly.getTime()) {
					isClearingRef.current = true;
					setInputValue("");
					onChange(null);
					setIsOpen(false);
					setTimeout(() => {
						isClearingRef.current = false;
					}, 100);
					return;
				}
			}
			
			const formatted = format(date, dateFormat);
			setInputValue(formatted);
			onChange(handleFormatDateValue(date));
			setIsOpen(false);
		} else if (date === undefined) {
			setInputValue("");
			onChange(null);
		}
	};

	const selectedDate = getSelectedDate();

	return (
		<div className="relative w-full">
			<Input
				id={id}
				type="text"
				value={inputValue}
				onChange={handleInputChange}
				onBlur={handleInputBlur}
				placeholder={placeholder}
				className={cn("pr-10", error && 'border-destructive/50 ring-destructive focus-visible:ring-destructive/50', className)}
				disabled={disabled}
			/>
			<Popover open={isOpen} onOpenChange={handleOpenChange} modal={true}>
				<PopoverTrigger asChild disabled={disabled}>
					<button
						type="button"
						disabled={disabled}
						className={cn(
							"absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4",
							disabled ? "cursor-not-allowed opacity-50" : "text-muted-foreground hover:text-foreground transition-colors",
						)}
						onClick={(e) => {
                            e.preventDefault();
							if (disabled) return;
							setIsOpen(true);
						}}
					>
						<CalendarIcon className="h-4 w-4" />
					</button>
				</PopoverTrigger>
				<PopoverContent className="w-auto p-0 z-[60]" align="start" onOpenAutoFocus={(e) => e.preventDefault()}>
					<Calendar
						mode="single"
						selected={selectedDate}
						onSelect={handleCalendarSelect}
						month={month}
						onMonthChange={setMonth}
						initialFocus
						disabled={(date) => {
							const max = getMaxDate(maxDate);
							const min = getMinDate(minDate);
							const checkDate = new Date(date);
							checkDate.setHours(0, 0, 0, 0);
							
							if (max) {
								const maxDateOnly = new Date(max);
								maxDateOnly.setHours(0, 0, 0, 0);
								if (checkDate > maxDateOnly) return true;
							}
							
							if (min) {
								const minDateOnly = new Date(min);
								minDateOnly.setHours(0, 0, 0, 0);
								if (checkDate < minDateOnly) return true;
							}
							
							return false;
						}}
						classNames={{
							cell: "[&:has([aria-selected])]:bg-transparent",
							day_today: "text-foreground bg-transparent",
							day_selected: "!bg-primary !text-primary-foreground hover:!bg-primary hover:!text-primary-foreground focus:!bg-primary focus:!text-primary-foreground",
						}}
					/>
				</PopoverContent>
			</Popover>
		</div>
	);
};

export default DateInput;

