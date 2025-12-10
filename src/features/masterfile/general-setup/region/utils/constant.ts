import { IColumn } from "@/components/DataTable/types";
import { IRegion } from "@features/masterfile/general-setup/region/types";

export const REGION_COLUMNS: IColumn<IRegion>[] = [
	{ key: "region_desc", header: "Region" },
];

export const REGION_FIELDS = [
	{
		name: "region_desc",
		label: "Region Description",
		placeholder: "Enter region description",
		required: true,
	},
];

