import { requiredStringValidation, z, zodObject } from "@/lib/validation";

export const COUNTRY_SCHEMA = zodObject({
	country_desc: requiredStringValidation("Country description"),
});

export type CountryFormData = z.infer<typeof COUNTRY_SCHEMA>;

