import { requiredStringValidation, z, zodObject } from "@/lib/validation";

export const MEMBERSHIP_TYPE_SCHEMA = zodObject({
	membership_type_desc: requiredStringValidation("Membership type description"),
});

export type MembershipTypeFormData = z.infer<typeof MEMBERSHIP_TYPE_SCHEMA>;

