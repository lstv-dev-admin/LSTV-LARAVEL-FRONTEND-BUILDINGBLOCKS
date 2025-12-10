import { IColumn } from "@/components/DataTable/types";
import { IArea } from "@features/masterfile/general-setup/area/types";

export const AREA_COLUMNS: IColumn<IArea>[] = [{ key: "area_desc", header: "Area" }];

export const AREA_FIELDS = [
    { 
        name: "area_desc", 
        label: "Area Description",
        placeholder: "Enter award description", 
        required: true 
    },
];