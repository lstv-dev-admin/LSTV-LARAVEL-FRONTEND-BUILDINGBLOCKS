import { IMasterfileEntity } from "@features/masterfile/types";

export interface IEmploymentType extends IMasterfileEntity {
	employment_type_id: string;
	employment_type_desc: string;
}

