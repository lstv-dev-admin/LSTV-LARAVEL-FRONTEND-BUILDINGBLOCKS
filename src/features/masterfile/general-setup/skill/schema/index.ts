import { requiredStringValidation, z, zodObject } from "@/lib/validation";

export const SKILL_SCHEMA = zodObject({
	skill_desc: requiredStringValidation("Skill description"),
});

export type SkillFormData = z.infer<typeof SKILL_SCHEMA>;

