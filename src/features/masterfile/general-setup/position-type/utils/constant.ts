import { Column } from "@/components/DataTable";
import { IPositionType } from "@features/masterfile/general-setup/position-type/types";

export const POSITION_TYPE_COLUMNS: Column<IPositionType>[] = [
	{ key: "position_type_desc", header: "Position Type" },
];

export const POSITION_TYPE_FIELDS = [
	{
		name: "position_type_desc",
		label: "Position Type Description",
		placeholder: "Enter position type description",
		required: true,
	},
];

