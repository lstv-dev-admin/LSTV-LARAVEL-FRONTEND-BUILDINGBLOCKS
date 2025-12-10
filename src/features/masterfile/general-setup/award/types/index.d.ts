import { IMasterfileEntity } from "@features/masterfile/types";

export interface IAward extends IMasterfileEntity {
	award_id: string;
	award_desc: string;
}