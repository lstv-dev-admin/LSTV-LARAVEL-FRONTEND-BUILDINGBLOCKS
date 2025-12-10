import { Column } from "@/components/DataTable";
import { IMembershipType } from "@features/masterfile/general-setup/membership-type/types";

export const MEMBERSHIP_TYPE_COLUMNS: Column<IMembershipType>[] = [
	{ key: "membership_type_desc", header: "Membership Type" },
];

export const MEMBERSHIP_TYPE_FIELDS = [
	{
		name: "membership_type_desc",
		label: "Membership Type Description",
		placeholder: "Enter membership type description",
		required: true,
	},
];

