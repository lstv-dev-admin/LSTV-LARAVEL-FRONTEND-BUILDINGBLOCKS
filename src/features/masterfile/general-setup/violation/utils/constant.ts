import { IColumn } from "@/components/DataTable/types";
import { IViolation } from "@features/masterfile/general-setup/violation/types";

export const VIOLATION_COLUMNS: IColumn<IViolation>[] = [
	{ key: "violation_desc", header: "Violation" },
];

export const VIOLATION_FIELDS = [
	{
		name: "violation_desc",
		label: "Violation Description",
		placeholder: "Enter violation description",
		required: true,
	},
];

