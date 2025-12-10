import { requiredStringValidation, z, zodObject } from "@/lib/validation";

export const PROVINCE_SCHEMA = zodObject({
	province_desc: requiredStringValidation("Province description"),
});

export type ProvinceFormData = z.infer<typeof PROVINCE_SCHEMA>;

