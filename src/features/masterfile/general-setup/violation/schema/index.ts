import { requiredStringValidation, z, zodObject } from "@/lib/validation";

export const VIOLATION_SCHEMA = zodObject({
	violation_desc: requiredStringValidation("Violation description"),
});

export type ViolationFormData = z.infer<typeof VIOLATION_SCHEMA>;

