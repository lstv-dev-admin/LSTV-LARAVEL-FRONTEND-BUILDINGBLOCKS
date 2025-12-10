import { IMasterfileEntity } from "@features/masterfile/types";

export interface IProvince extends IMasterfileEntity {
	province_id: string;
	province_desc: string;
}

