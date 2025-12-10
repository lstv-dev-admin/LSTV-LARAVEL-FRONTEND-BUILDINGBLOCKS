import { z, zodObject, dateValidation } from '@/lib/validation';

export const DATE_LOCK_SCHEMA = zodObject({
    date_from: dateValidation({ fieldName: "Date From", required: true }),
    date_to: dateValidation({ fieldName: "Date To", required: true }),
    is_date_lock_automatic: z.union([z.literal(0), z.literal(1)]),
    days_before: z.preprocess(
        (value) => (value === "" ? undefined : Number(value)),
        z.number({
            required_error: "Automated Date From is required"
        }).min(0, { message: "Value cannot be negative" })
    ),
    days_after: z.preprocess(
        (value) => (value === "" ? undefined : Number(value)),
        z.number({
            required_error: "Automated Date To is required"
        }).min(0, { message: "Value cannot be negative" })
    ),
}).refine((data) => {
    if (!data.date_from || !data.date_to) return true;
    const fromDate = data.date_from instanceof Date  ? data.date_from  : typeof data.date_from === 'string' ? new Date(data.date_from) : null;
    const toDate = data.date_to instanceof Date ? data.date_to : typeof data.date_to === 'string' ? new Date(data.date_to) : null;
    
    if (!fromDate || !toDate || isNaN(fromDate.getTime()) || isNaN(toDate.getTime())) return true;
    return fromDate <= toDate;
}, {
    message: "Date From must be before or equal to Date To",
    path: ["date_from"]
}).refine((data) => {
    if (!data.date_to) return true;
    const toDate = data.date_to instanceof Date ? data.date_to : typeof data.date_to === 'string' ? new Date(data.date_to) : null;
    
    if (!toDate || isNaN(toDate.getTime())) return true;
    
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const toDateOnly = new Date(toDate);
    toDateOnly.setHours(0, 0, 0, 0);
    
    return toDateOnly >= today;
}, {
    message: "Date To cannot be before today",
    path: ["date_to"]
});

export type DateLockFormValues = z.infer<typeof DATE_LOCK_SCHEMA>;