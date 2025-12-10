import { requiredStringValidation, z, zodObject } from "@/lib/validation";

export const AWARD_SCHEMA = zodObject({
    award_desc: requiredStringValidation('Award description'),
});

export type AwardFormData = z.infer<typeof AWARD_SCHEMA>