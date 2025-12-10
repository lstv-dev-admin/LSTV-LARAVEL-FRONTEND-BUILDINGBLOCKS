import { requiredStringValidation, z, zodObject } from "@/lib/validation";

export const CITY_SCHEMA = zodObject({
    city_desc: requiredStringValidation('City description'),
});

export type CityFormData = z.infer<typeof CITY_SCHEMA>