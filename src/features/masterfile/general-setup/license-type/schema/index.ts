import { requiredStringValidation, z, zodObject } from "@/lib/validation";

export const LICENSE_TYPE_SCHEMA = zodObject({
	license_type_desc: requiredStringValidation("License type description"),
});

export type LicenseTypeFormData = z.infer<typeof LICENSE_TYPE_SCHEMA>;

