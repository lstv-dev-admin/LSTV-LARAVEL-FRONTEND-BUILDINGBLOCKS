import { Column } from "@/components/DataTable";
import { ILicenseType } from "@features/masterfile/general-setup/license-type/types";

export const LICENSE_TYPE_COLUMNS: Column<ILicenseType>[] = [
	{ key: "license_type_desc", header: "License Type" },
];

export const LICENSE_TYPE_FIELDS = [
	{
		name: "license_type_desc",
		label: "License Type Description",
		placeholder: "Enter license type description",
		required: true,
	},
];

