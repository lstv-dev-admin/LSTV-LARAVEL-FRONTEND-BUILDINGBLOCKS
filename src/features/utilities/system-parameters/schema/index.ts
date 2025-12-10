import { z, zodObject } from "@/lib/validation";

export const SYSTEM_PARAMETER_SCHEMA = zodObject({
    max_activity_log_record_counts: z.number().min(0),
    is_date_lock_global: z.boolean(),
});

export type SystemParameterFormData = z.infer<typeof SYSTEM_PARAMETER_SCHEMA>;