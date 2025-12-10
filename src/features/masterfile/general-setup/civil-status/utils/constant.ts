import { Column } from "@/components/DataTable";
import { ICivilStatus } from "@features/masterfile/general-setup/civil-status/types";

export const CIVIL_STATUS_COLUMNS: Column<ICivilStatus>[] = [
	{ key: "civil_status_desc", header: "Civil Status" },
];

export const CIVIL_STATUS_FIELDS = [
	{
		name: "civil_status_desc",
		label: "Civil Status Description",
		placeholder: "Enter civil status description",
		required: true,
	},
];

