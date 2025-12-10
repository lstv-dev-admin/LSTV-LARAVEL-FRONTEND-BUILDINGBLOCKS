import { IMasterfileEntity } from "@features/masterfile/types";

export interface ILicenseType extends IMasterfileEntity {
	license_type_id: string;
	license_type_desc: string;
}

