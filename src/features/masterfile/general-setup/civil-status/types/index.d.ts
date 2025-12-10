import { IMasterfileEntity } from "@features/masterfile/types";

export interface ICivilStatus extends IMasterfileEntity {
	civil_status_id: string;
	civil_status_desc: string;
}

