import { IMasterfileEntity } from "@features/masterfile/types";

export interface ISuffix extends IMasterfileEntity {
	suffix_id: string;
	suffix_desc: string;
}

