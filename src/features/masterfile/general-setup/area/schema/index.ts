import { requiredStringValidation, z, zodObject } from "@/lib/validation";

export const AREA_SCHEMA = zodObject({
    area_desc: requiredStringValidation('Area description'),
});

export type AreaFormData = z.infer<typeof AREA_SCHEMA>;