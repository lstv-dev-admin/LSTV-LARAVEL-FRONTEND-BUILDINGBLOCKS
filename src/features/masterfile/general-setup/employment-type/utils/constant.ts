import { Column } from "@/components/DataTable";
import { IEmploymentType } from "@features/masterfile/general-setup/employment-type/types";

export const EMPLOYMENT_TYPE_COLUMNS: Column<IEmploymentType>[] = [
	{ key: "employment_type_desc", header: "Employment Type" },
];

export const EMPLOYMENT_TYPE_FIELDS = [
	{
		name: "employment_type_desc",
		label: "Employment Type Description",
		placeholder: "Enter employment type description",
		required: true,
	},
];

