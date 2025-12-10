import { IColumn } from "@/components/DataTable/types";
import { ICountry } from "@features/masterfile/general-setup/country/types";

export const COUNTRY_COLUMNS: IColumn<ICountry>[] = [
	{ key: "country_desc", header: "Country" },
];

export const COUNTRY_FIELDS = [
	{
		name: "country_desc",
		label: "Country Description",
		placeholder: "Enter country description",
		required: true,
	},
];

