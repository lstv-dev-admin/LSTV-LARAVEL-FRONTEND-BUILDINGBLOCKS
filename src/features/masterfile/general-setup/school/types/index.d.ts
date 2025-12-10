import { IMasterfileEntity } from "@features/masterfile/types";

export interface ISchool extends IMasterfileEntity {
	school_id: string;
	school_desc: string;
}

