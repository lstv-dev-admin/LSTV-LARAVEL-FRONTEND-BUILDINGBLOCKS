import { requiredStringValidation, z, zodObject } from "@/lib/validation";

export const CIVIL_STATUS_SCHEMA = zodObject({
	civil_status_desc: requiredStringValidation("Civil status description"),
});

export type CivilStatusFormData = z.infer<typeof CIVIL_STATUS_SCHEMA>;

