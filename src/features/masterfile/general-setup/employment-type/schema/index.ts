import { requiredStringValidation, z, zodObject } from "@/lib/validation";

export const EMPLOYMENT_TYPE_SCHEMA = zodObject({
	employment_type_desc: requiredStringValidation("Employment type description"),
});

export type EmploymentTypeFormData = z.infer<typeof EMPLOYMENT_TYPE_SCHEMA>;

