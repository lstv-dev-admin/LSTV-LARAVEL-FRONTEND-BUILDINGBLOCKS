import { requiredStringValidation, z, zodObject } from "@/lib/validation";

export const SCHOOL_SCHEMA = zodObject({
	school_desc: requiredStringValidation("School description"),
});

export type SchoolFormData = z.infer<typeof SCHOOL_SCHEMA>;

