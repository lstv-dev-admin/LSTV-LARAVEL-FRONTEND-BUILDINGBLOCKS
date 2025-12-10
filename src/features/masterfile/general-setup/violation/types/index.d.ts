import { IMasterfileEntity } from "@features/masterfile/types";

export interface IViolation extends IMasterfileEntity {
	violation_id: string;
	violation_desc: string;
}

