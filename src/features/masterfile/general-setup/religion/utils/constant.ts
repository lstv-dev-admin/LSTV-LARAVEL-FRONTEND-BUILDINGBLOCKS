import { Column } from "@/components/DataTable";
import { IReligion } from "@features/masterfile/general-setup/religion/types";

export const RELIGION_COLUMNS: Column<IReligion>[] = [
	{ key: "religion_desc", header: "Religion" },
];

export const RELIGION_FIELDS = [
	{
		name: "religion_desc",
		label: "Religion Description",
		placeholder: "Enter religion description",
		required: true,
	},
];

