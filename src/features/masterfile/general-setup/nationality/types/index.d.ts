import { IMasterfileEntity } from "@features/masterfile/types";

export interface INationality extends IMasterfileEntity {
	nationality_id: string;
	nationality_desc: string;
}

