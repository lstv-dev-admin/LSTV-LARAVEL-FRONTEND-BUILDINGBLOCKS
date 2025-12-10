import { requiredStringValidation, z, zodObject } from "@/lib/validation";

export const PREFIX_SCHEMA = zodObject({
	prefix_desc: requiredStringValidation("Prefix description"),
});

export type PrefixFormData = z.infer<typeof PREFIX_SCHEMA>;

