import { Column } from "@/components/DataTable";
import { IRegionProvinceCity } from "@features/masterfile/general-setup/region-province-city/types";

export const REGION_PROVINCE_CITY_COLUMNS: Column<IRegionProvinceCity>[] = [
	{ key: "region_desc", header: "Region" },
	{ key: "province_desc", header: "Province" },
	{ key: "city_desc", header: "City" },
];

export const REGION_PROVINCE_CITY_FIELDS = [
	{
		name: "region_id",
		label: "Region Description",
		placeholder: "Enter region",
		required: true,
		autocomplete: {
			endpoint: "/dropdown/general-setup/region-dropdown",
			queryKey: "region-autocomplete",
			valueField: "region_id",
			labelField: "region_desc",
		},
	},
	{
		name: "province_id",
		label: "Province Description",
		placeholder: "Enter Province",
		required: true,
		autocomplete: {
			endpoint: "/dropdown/general-setup/province-dropdown",
			queryKey: "province-autocomplete",
			valueField: "province_id",
			labelField: "province_desc",
		},
	},
	{
		name: "city_desc",
		label: "City Description",
		placeholder: "Enter city",
		required: true,
		autocomplete: {
			endpoint: "/dropdown/general-setup/city-dropdown",
			queryKey: "city-autocomplete",
			valueField: "city_id",
			labelField: "city_desc",
		},
	},
];
