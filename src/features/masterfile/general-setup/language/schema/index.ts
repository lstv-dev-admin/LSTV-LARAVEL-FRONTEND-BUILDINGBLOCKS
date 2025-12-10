import { requiredStringValidation, z, zodObject } from "@/lib/validation";

export const LANGUAGE_SCHEMA = zodObject({
	language_desc: requiredStringValidation("Language description"),
});

export type LanguageFormData = z.infer<typeof LANGUAGE_SCHEMA>;

