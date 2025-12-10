import { IMasterfileEntity } from "@features/masterfile/types";

export interface ICitizenship extends IMasterfileEntity {
	citizenship_id: number;
	citizenship_desc: string;
}