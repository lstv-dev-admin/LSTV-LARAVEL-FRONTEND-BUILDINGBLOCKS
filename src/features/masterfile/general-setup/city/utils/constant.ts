import { IColumn } from "@/components/DataTable/types";
import { ICity } from "@features/masterfile/general-setup/city/types";

export const CITY_COLUMNS: IColumn<ICity>[] = [{ key: "city_desc", header: "Area" }];

export const CITY_FIELDS = [
    { 
        name: "city_desc", 
        label: "City Description",
        placeholder: "Enter award description", 
        required: true 
    },
];