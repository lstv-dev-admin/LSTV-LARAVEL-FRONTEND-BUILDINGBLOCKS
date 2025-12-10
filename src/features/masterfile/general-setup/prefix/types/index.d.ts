import { IMasterfileEntity } from "@features/masterfile/types";

export interface IPrefix extends IMasterfileEntity {
	prefix_id: string;
	prefix_desc: string;
}

