import { Column } from "@/components/DataTable";
import { ICitizenship } from "@features/masterfile/general-setup/citizenship/types";

export const CITIZENSHIP_COLUMNS: Column<ICitizenship>[] = [
    { key: "citizenship_desc", header: "Citizenship" },
];

export const CITIZENSHIP_FIELDS = [
    {
        name: "citizenship_desc",
        label: "Citizenship Description",
        placeholder: "Enter citizenship description",
        required: true,
    },
];