import { IMasterfileEntity } from "@features/masterfile/types";

export interface ILanguage extends IMasterfileEntity {
	language_id: string;
	language_desc: string;
}

