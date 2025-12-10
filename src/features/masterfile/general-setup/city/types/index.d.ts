import { IMasterfileEntity } from "@features/masterfile/types";

export interface ICity extends IMasterfileEntity {
	city_id: string;
	city_desc: string;
}