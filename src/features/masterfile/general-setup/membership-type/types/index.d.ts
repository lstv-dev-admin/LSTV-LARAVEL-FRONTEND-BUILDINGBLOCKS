import { IMasterfileEntity } from "@features/masterfile/types";

export interface IMembershipType extends IMasterfileEntity {
	membership_type_id: string;
	membership_type_desc: string;
}

