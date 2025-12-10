import { Column } from "@/components/DataTable";
import { ISchool } from "@features/masterfile/general-setup/school/types";

export const SCHOOL_COLUMNS: Column<ISchool>[] = [
	{ key: "school_desc", header: "School" },
];

export const SCHOOL_FIELDS = [
	{
		name: "school_desc",
		label: "School Description",
		placeholder: "Enter school description",
		required: true,
	},
];

