import { IColumn } from "@/components/DataTable/types";
import { ISkill } from "@features/masterfile/general-setup/skill/types";

export const SKILL_COLUMNS: IColumn<ISkill>[] = [
	{ key: "skill_desc", header: "Skill" },
];

export const SKILL_FIELDS = [
	{
		name: "skill_desc",
		label: "Skill Description",
		placeholder: "Enter skill description",
		required: true,
	},
];

