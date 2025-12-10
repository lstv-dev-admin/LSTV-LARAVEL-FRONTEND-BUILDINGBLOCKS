import { Column } from "@/components/DataTable";
import { IProvince } from "@features/masterfile/general-setup/province/types";

export const PROVINCE_COLUMNS: Column<IProvince>[] = [
	{ key: "province_desc", header: "Province" },
];

export const PROVINCE_FIELDS = [
	{
		name: "province_desc",
		label: "Province Description",
		placeholder: "Enter province description",
		required: true,
	},
];

