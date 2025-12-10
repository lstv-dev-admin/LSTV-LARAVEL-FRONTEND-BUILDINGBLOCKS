import { requiredStringValidation, z, zodObject } from "@/lib/validation";

export const REGION_SCHEMA = zodObject({
	region_desc: requiredStringValidation("Region description"),
});

export type RegionFormData = z.infer<typeof REGION_SCHEMA>;

