import { IMasterfileEntity } from "@features/masterfile/types";

export interface IPositionType extends IMasterfileEntity {
	position_type_id: string;
	position_type_desc: string;
}

