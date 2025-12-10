import { IMasterfileEntity } from "@features/masterfile/types";

export interface IRegion extends IMasterfileEntity {
	region_id: string;
	region_desc: string;
}

