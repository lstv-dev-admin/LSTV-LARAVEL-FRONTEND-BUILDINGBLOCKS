import { IMasterfileEntity } from "@features/masterfile/types";

export interface IRequirement extends IMasterfileEntity {
	requirement_id: string;
	requirement_desc: string;
}

