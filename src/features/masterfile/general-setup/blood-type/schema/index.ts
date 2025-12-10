import { requiredStringValidation, z, zodObject } from "@/lib/validation";

export const BLOOD_TYPE_SCHEMA = zodObject({
    blood_type_desc: requiredStringValidation('Blood Type description'),
});

export type BloodTypeFormData = z.infer<typeof BLOOD_TYPE_SCHEMA>