import { Column } from "@/components/DataTable";
import { IPrefix } from "@features/masterfile/general-setup/prefix/types";

export const PREFIX_COLUMNS: Column<IPrefix>[] = [
	{ key: "prefix_desc", header: "Prefix" },
];

export const PREFIX_FIELDS = [
	{
		name: "prefix_desc",
		label: "Prefix Description",
		placeholder: "Enter prefix description",
		required: true,
	},
];

