import { IMasterfileEntity } from "@features/masterfile/types";

export interface IBloodType extends IMasterfileEntity {
	blood_type_id: string;
	blood_type_desc: string;
}