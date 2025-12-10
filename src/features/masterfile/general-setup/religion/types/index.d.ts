import { IMasterfileEntity } from "@features/masterfile/types";

export interface IReligion extends IMasterfileEntity {
	religion_id: string;
	religion_desc: string;
}

