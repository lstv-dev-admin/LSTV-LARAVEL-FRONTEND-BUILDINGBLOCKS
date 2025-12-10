import { requiredStringValidation, z, zodObject } from "@/lib/validation";

export const CITIZENSHIP_SCHEMA = zodObject({
    citizenship_desc: requiredStringValidation("Citizenship description"),
});

export type CitizenshipFormData = z.infer<typeof CITIZENSHIP_SCHEMA>;