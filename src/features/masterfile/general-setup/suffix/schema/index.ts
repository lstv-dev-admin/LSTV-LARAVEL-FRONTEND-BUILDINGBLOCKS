import { requiredStringValidation, z, zodObject } from "@/lib/validation";

export const SUFFIX_SCHEMA = zodObject({
	suffix_desc: requiredStringValidation("Suffix description"),
});

export type SuffixFormData = z.infer<typeof SUFFIX_SCHEMA>;

