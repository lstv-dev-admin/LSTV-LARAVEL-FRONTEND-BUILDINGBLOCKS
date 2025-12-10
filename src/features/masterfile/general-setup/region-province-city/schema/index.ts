import { requiredStringValidation, z, zodObject } from "@/lib/validation";

export const REGION_PROVINCE_CITY_SCHEMA = zodObject({
	region_desc: requiredStringValidation("Region description"),
	province_desc: requiredStringValidation("Province description"),
	city_desc: requiredStringValidation("City description"),
});

export type RegionProvinceCityFormData = z.infer<typeof REGION_PROVINCE_CITY_SCHEMA>;