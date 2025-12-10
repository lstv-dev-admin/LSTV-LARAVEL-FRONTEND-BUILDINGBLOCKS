import { IMasterfileEntity } from "@features/masterfile/types";

export interface ICountry extends IMasterfileEntity {
	country_id: string;
	country_desc: string;
}

