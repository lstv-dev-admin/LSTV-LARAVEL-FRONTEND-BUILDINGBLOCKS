import { IColumn } from "@/components/DataTable/types";
import { ISuffix } from "@features/masterfile/general-setup/suffix/types";

export const SUFFIX_COLUMNS: IColumn<ISuffix>[] = [
	{ key: "suffix_desc", header: "Suffix" },
];

export const SUFFIX_FIELDS = [
	{
		name: "suffix_desc",
		label: "Suffix Description",
		placeholder: "Enter suffix description",
		required: true,
	},
];

