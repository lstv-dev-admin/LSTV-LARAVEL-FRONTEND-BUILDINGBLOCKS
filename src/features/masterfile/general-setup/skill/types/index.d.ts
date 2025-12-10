import { IMasterfileEntity } from "@features/masterfile/types";

export interface ISkill extends IMasterfileEntity {
	skill_id: string;
	skill_desc: string;
}

