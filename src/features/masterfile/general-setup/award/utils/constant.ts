import { IColumn } from "@/components/DataTable/types";
import { IAward } from "@features/masterfile/general-setup/award/types";

export const AWARD_COLUMNS: IColumn<IAward>[] = [{ key: "award_desc", header: "Award" }];

export const AWARD_FIELDS = [
    { 
        name: "award_desc", 
        label: "Award Description",
        placeholder: "Enter award description", 
        required: true 
    },
];