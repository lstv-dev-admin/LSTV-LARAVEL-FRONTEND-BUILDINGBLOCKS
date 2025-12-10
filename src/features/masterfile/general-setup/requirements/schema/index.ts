import { requiredStringValidation, z, zodObject } from "@/lib/validation";

export const REQUIREMENTS_SCHEMA = zodObject({
	requirement_desc: requiredStringValidation("Requirement description"),
});

export type RequirementFormData = z.infer<typeof REQUIREMENTS_SCHEMA>;

