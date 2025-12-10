import * as XLSX from "xlsx";
import { z } from "@/lib/validation";

export const exportTemplateExcel = <T extends z.ZodRawShape>(
    title: string,
    schema: z.ZodObject<T>,
    filenamePrefix = "HR-Connect",
) => {
    // Extract all field names from the schema shape
    const fieldNames = Object.keys(schema.shape) as (keyof T)[];

    // Build a sample row with sample data
    const sampleRow = fieldNames.reduce((acc, key) => {
        acc[key] = `Sample ${String(key)}`;
        return acc;
    }, {} as Record<keyof T, string>);

    // Create Excel workbook
    const worksheet = XLSX.utils.json_to_sheet([sampleRow]);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Template");

    // Save the file
    const filename = `${filenamePrefix}_${title.replace(/\s+/g, "_")}_Template.xlsx`;
    XLSX.writeFile(workbook, filename);
};

