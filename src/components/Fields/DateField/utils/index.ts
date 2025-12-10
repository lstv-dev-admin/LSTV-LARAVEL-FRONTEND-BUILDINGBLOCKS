import { format, parse, isValid } from 'date-fns';
import { ValueFormat } from '../types';

export const getValueFormatPattern = (formatType: ValueFormat, dateFormat: string): string => {
    const VALUE_FORMAT_MAP: Record<Exclude<ValueFormat, 'default'>, string> = {
        'yyyy-mm-dd': 'yyyy-MM-dd',
        'dd-mm-yyyy': 'dd-MM-yyyy',
        'mm-dd-yyyy': 'MM-dd-yyyy',
    };

	if (formatType === 'default') return dateFormat;
	return VALUE_FORMAT_MAP[formatType] ?? dateFormat;
};

export const formatDateValue = (date: Date | null, valueFormat: ValueFormat, dateFormat: string): Date | string | null => {
	if (!date) return null;
	if (valueFormat === 'default') return date;
	
	const formatPattern = getValueFormatPattern(valueFormat, dateFormat);
	return format(date, formatPattern);
};

export const parseDateValue = (val: Date | string | null | undefined, valueFormat: ValueFormat, dateFormat: string): Date | null => {
	if (!val) return null;
	if (val instanceof Date) return val;
	
	if (valueFormat !== 'default') {
		const formatPattern = getValueFormatPattern(valueFormat, dateFormat);
		try {
			const parsed = parse(val, formatPattern, new Date());
			if (isValid(parsed)) return parsed;
		} catch {
			const date = new Date(val);
			if (isValid(date)) return date;
		}
	} else {
		const date = new Date(val);
		if (isValid(date)) return date;
	}
	
	return null;
};

export const formatInputValue = (val: string): string => {
	const digits = val.replace(/\D/g, "");
	if (digits.length === 0) return "";
	if (digits.length <= 2) return digits;
	if (digits.length <= 4) return `${digits.slice(0, 2)}/${digits.slice(2)}`;
	return `${digits.slice(0, 2)}/${digits.slice(2, 4)}/${digits.slice(4, 8)}`;
};

export const getMaxDate = (maxDate: Date | 'today' | null | undefined): Date | undefined => {
	if (maxDate === 'today') {
		const today = new Date();
		today.setHours(23, 59, 59, 999);
		return today;
	}
	if (maxDate instanceof Date) {
		const date = new Date(maxDate);
		date.setHours(23, 59, 59, 999);
		return date;
	}
	return undefined;
};

export const getMinDate = (minDate: Date | 'today' | null | undefined): Date | undefined => {
	if (minDate === 'today') {
		const today = new Date();
		today.setHours(0, 0, 0, 0);
		return today;
	}
	if (minDate instanceof Date) {
		const date = new Date(minDate);
		date.setHours(0, 0, 0, 0);
		return date;
	}
	return undefined;
};

export const isDateDisabled = (date: Date, maxDate: Date | 'today' | null | undefined): boolean => {
	const max = getMaxDate(maxDate);
	if (!max) return false;
	const checkDate = new Date(date);
	checkDate.setHours(0, 0, 0, 0);
	const maxDateOnly = new Date(max);
	maxDateOnly.setHours(0, 0, 0, 0);
	return checkDate > maxDateOnly;
};

