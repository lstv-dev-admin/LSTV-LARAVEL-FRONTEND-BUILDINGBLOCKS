import * as XLSX from "xlsx";
import toast from "@/lib/toast";
import { IColumn } from "@/components/DataTable/types";
import { getFileDateTime } from "./get-file-date-time";

export interface ExportExcelOptions<TRow extends object> {
    title: string;
    columns: IColumn<TRow>[];
    rows: TRow[];
    filenamePrefix?: string;
}

export const exportTableExcel = <TRow extends object>({
    title,
    columns,
    rows,
    filenamePrefix = "HR-Connect",
}: ExportExcelOptions<TRow>) => {
    if (!rows.length) {
        toast.error(`No ${title.toLowerCase()} data available to export.`);
        return;
    }

    const toastId = toast.loading(`Generating ${title} Excel file...`);

    try {
        // Map columns to headers & extract only the required fields
        const headers = columns.map((col) =>
            typeof col.header === "string" ? col.header : String(col.header)
        );

        const data = rows.map((row) =>
            columns.map((col) => {
                const key = col.key as keyof TRow;
                const value = row[key];
                if (value == null) return "";
                if (typeof value === "string" || typeof value === "number") return value;
                return JSON.stringify(value);
            })
        );

        // Combine headers and data into a single array for worksheet creation
        const worksheetData = [headers, ...data];

        // Create worksheet and workbook
        const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, title);

        const formattedDate = getFileDateTime();

        // ✅ Filename
        const fileName = `${filenamePrefix}_${title
            .toLowerCase()
            .replace(/\s+/g, "_")}_${formattedDate}.xlsx`;

        // Write & trigger download
        XLSX.writeFile(workbook, fileName);

        toast.success(`${title} Excel successfully downloaded!`, { id: toastId });
    } catch (error) {
        console.error("[exportTableExcel] Error exporting Excel:", error);
        toast.error(`Failed to export ${title} Excel. Please try again.`, {
        id: toastId,
        });
    }
};

