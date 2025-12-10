import { Column } from "@/components/DataTable";
import { INationality } from "@features/masterfile/general-setup/nationality/types";

export const NATIONALITY_COLUMNS: Column<INationality>[] = [
	{ key: "nationality_desc", header: "Nationality" },
];

export const NATIONALITY_FIELDS = [
	{
		name: "nationality_desc",
		label: "Nationality Description",
		placeholder: "Enter nationality description",
		required: true,
	},
];

