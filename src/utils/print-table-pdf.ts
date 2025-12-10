import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import toast from "@/lib/toast";
import { IColumn } from "@/components/DataTable/types";

export interface PrintPDFOptions<TRow extends object> {
    title: string;
    columns: IColumn<TRow>[];
    rows: TRow[];
    filenamePrefix?: string;
}

export const printTablePDF = <TRow extends object>({
    title,
    columns,
    rows,
    filenamePrefix = "HR-Connect",
}: PrintPDFOptions<TRow>) => {
    if (!rows.length) {
        toast.error(`No ${title.toLowerCase()} data available to print.`);
        return;
    }

    const toastId = toast.loading(`Generating ${title} PDF...`);

    try {
        const doc = new jsPDF();

        // Only use headers from passed columns
        const tableHeaders = columns.map((col) =>
            typeof col.header === "string" ? col.header : String(col.header)
        );

        // Build rows ONLY from the columns (not all object keys)
        const tableRows = rows.map((row) =>
            columns.map((col) => {
                const key = col.key as keyof TRow;
                const value = row[key];

                if (value == null) return ""; // handle null/undefined
                if (typeof value === "string" || typeof value === "number") return value;
                return JSON.stringify(value);
            })
        );

        // PDF title
        doc.text(title, 14, 15);

        // Table
        autoTable(doc, {
            head: [tableHeaders],
            body: tableRows,
            startY: 20,
            styles: { fontSize: 8 },
            headStyles: { fillColor: "#627D4D" },
        });

        // Date + Time formatting (MM-DD-YYYY_THH-MM-SS)
        const now = new Date();
        const month = String(now.getMonth() + 1).padStart(2, "0");
        const day = String(now.getDate()).padStart(2, "0");
        const year = now.getFullYear();
        const hours = String(now.getHours()).padStart(2, "0");
        const minutes = String(now.getMinutes()).padStart(2, "0");
        const seconds = String(now.getSeconds()).padStart(2, "0");

        const formattedDate = `${month}-${day}-${year}_T${hours}-${minutes}-${seconds}`;

        const fileName = `${filenamePrefix}_${title
            .toLowerCase()
            .replace(/\s+/g, "_")}_${formattedDate}.pdf`;

        // Save
        doc.save(fileName);

        toast.success(`${title} PDF successfully downloaded!`, { id: toastId });
    } catch (error) {
        console.error("[printTablePDF] Error generating PDF:", error);
        toast.error(`Failed to generate ${title} PDF.`, { id: toastId });
    }
};

