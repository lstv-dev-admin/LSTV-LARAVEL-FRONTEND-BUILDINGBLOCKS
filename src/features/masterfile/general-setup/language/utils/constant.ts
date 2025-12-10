import { Column } from "@/components/DataTable";
import { ILanguage } from "@features/masterfile/general-setup/language/types";

export const LANGUAGE_COLUMNS: Column<ILanguage>[] = [
	{ key: "language_desc", header: "Language" },
];

export const LANGUAGE_FIELDS = [
	{
		name: "language_desc",
		label: "Language Description",
		placeholder: "Enter language description",
		required: true,
	},
];

