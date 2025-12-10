import { parse, isValid, format } from "date-fns";

export type DateFormat = "yyyy-mm-dd" | "mm-dd-yyyy" | "dd-mm-yyyy";

const DATE_FORMAT_PATTERNS: Record<DateFormat, string> = {
	"yyyy-mm-dd": "yyyy-MM-dd",
	"mm-dd-yyyy": "MM-dd-yyyy",
	"dd-mm-yyyy": "dd-MM-yyyy",
};

const tryParseWithFormat = (value: string, format?: DateFormat): Date | null => {
	if (!format) return null;
	const pattern = DATE_FORMAT_PATTERNS[format];
	const parsed = parse(value, pattern, new Date());
	return isValid(parsed) ? parsed : null;
};

const tryParseNative = (value: string): Date | null => {
	const d = new Date(value);
	return isValid(d) ? d : null;
};

export const parseDateString = (value: string, format?: DateFormat): Date | null => {
	if (!value?.trim()) return null;
	const strictParsed = tryParseWithFormat(value, format);
	if (strictParsed) return strictParsed;
	return tryParseNative(value);
};

export const formatDateToString = (
	value: Date | string | null | undefined,
	outputFormat: DateFormat = "yyyy-mm-dd"
): string => {
	if (!value) return "";
	const dateObj: Date | null =
		value instanceof Date ? value : typeof value === "string" ? parseDateString(value) : null;
	if (!dateObj || !isValid(dateObj)) return "";
	return format(dateObj, DATE_FORMAT_PATTERNS[outputFormat]);
};

export const parseDateStringToDate = (
	value: string | null | undefined,
	inputFormat?: DateFormat
): Date | null => {
	if (!value?.trim()) return null;
	return parseDateString(value, inputFormat);
};

export const formatDateToISOString = (date: Date | string | null): string | null => {
	if (!date) return null;
	const dateObj = date instanceof Date ? date : new Date(date);
	if (!isValid(dateObj)) return null;
	
	const year = dateObj.getFullYear();
	const month = String(dateObj.getMonth() + 1).padStart(2, '0');
	const day = String(dateObj.getDate()).padStart(2, '0');
	return `${year}-${month}-${day}T00:00:00.000Z`;
};

export const getTodayAtMidnight = (): Date => {
	const today = new Date();
	today.setHours(0, 0, 0, 0);
	return today;
};