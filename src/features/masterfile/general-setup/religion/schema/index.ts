import { requiredStringValidation, z, zodObject } from "@/lib/validation";

export const RELIGION_SCHEMA = zodObject({
	religion_desc: requiredStringValidation("Religion description"),
});

export type ReligionFormData = z.infer<typeof RELIGION_SCHEMA>;

