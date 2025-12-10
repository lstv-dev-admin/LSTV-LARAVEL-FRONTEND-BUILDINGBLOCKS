import { IColumn } from "@/components/DataTable/types";
import { IAward } from "@features/masterfile/general-setup/award/types";

export const BLOOD_TYPE_COLUMNS: IColumn<IAward>[] = [{ key: "blood_type_desc", header: "Blood Type" }];

export const BLOOD_TYPE_FIELDS = [
    { 
        name: "blood_type_desc", 
        label: "Blood Type Description",
        placeholder: "Enter blood type description", 
        required: true 
    },
];