import { z } from 'zod';
import { parseISO, startOfDay, isValid } from 'date-fns';

const parseDate = (val: unknown): Date | null => {
    if (!val) return null;

    if (val instanceof Date) return isValid(val) ? val : null;

    if (typeof val === 'string') {
        const date = parseISO(val);
        return isValid(date) ? date : null;
    }

    return null;
};

export const filterLogFormSchema = z
    .object({
        remarks: z.string().optional(),
        user: z.string().optional(),
        activity: z.string().optional(),
        module_entry: z.string().optional(),
        date_from: z.union([z.date(), z.string()]).optional().nullable(),
        date_to: z.union([z.date(), z.string()]).optional().nullable(),
    })
    .refine((data) => {
        const from = parseDate(data.date_from);
        const to = parseDate(data.date_to);

        if (!from || !to) return true;

        return startOfDay(from).getTime() <= startOfDay(to).getTime();
    }, {
        message: 'Date from must be earlier than or equal to Date to',
        path: ['date_from'],
    })
    .refine((data) => {
        const to = parseDate(data.date_to);
        if (!to) return true;

        const today = startOfDay(new Date());
        return startOfDay(to).getTime() <= today.getTime();
    },{
        message: 'Date to cannot be in the future',
        path: ['date_to'],
    });

export type FilterLogFormData = z.infer<typeof filterLogFormSchema>;
