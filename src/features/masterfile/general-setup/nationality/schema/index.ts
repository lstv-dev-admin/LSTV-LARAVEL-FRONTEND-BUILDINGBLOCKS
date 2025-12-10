import { requiredStringValidation, z, zodObject } from "@/lib/validation";

export const NATIONALITY_SCHEMA = zodObject({
	nationality_desc: requiredStringValidation("Nationality description"),
});

export type NationalityFormData = z.infer<typeof NATIONALITY_SCHEMA>;

