import { requiredStringValidation, z, zodObject } from "@/lib/validation";

export const POSITION_TYPE_SCHEMA = zodObject({
	position_type_desc: requiredStringValidation("Position type description"),
});

export type PositionTypeFormData = z.infer<typeof POSITION_TYPE_SCHEMA>;

