import { Column } from "@/components/DataTable";
import { IRequirement } from "@features/masterfile/general-setup/requirements/types";

export const REQUIREMENTS_COLUMNS: Column<IRequirement>[] = [
	{ key: "requirement_desc", header: "Requirement" },
];

export const REQUIREMENTS_FIELDS = [
	{
		name: "requirement_desc",
		label: "Requirement Description",
		placeholder: "Enter requirement description",
		required: true,
	},
];

