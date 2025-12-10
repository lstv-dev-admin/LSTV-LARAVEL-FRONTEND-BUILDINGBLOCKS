import * as XLSX from "xlsx";
import { z } from "@/lib/validation";

interface ParseExcelToSchemaOptions<TFormData extends Record<string, unknown>> {
	file: File;
	schema: z.ZodType<TFormData>;
}

export const parseExcelToSchema = async <TFormData extends Record<string, unknown>>({
	file,
	schema,
}: ParseExcelToSchemaOptions<TFormData>): Promise<TFormData[]> => {
	const buffer = await file.arrayBuffer();
	const workbook = XLSX.read(buffer, { type: "array" });
	const sheetName = workbook.SheetNames[0];
	const worksheet = workbook.Sheets[sheetName];

	const rawRows = XLSX.utils.sheet_to_json<Record<string, unknown>>(worksheet, {
		defval: "",
	});

	const errors: string[] = [];
	const parsedRows: TFormData[] = [];

	rawRows.forEach((row, index) => {
		const result = schema.safeParse(row);
		if (!result.success) {
			const issueMessages = result.error.issues
				.map((issue) => {
					const path = issue.path.join(".") || "root";
					return `${path}: ${issue.message}`;
				})
				.join("; ");
			errors.push(`Row ${index + 2}: ${issueMessages}`);
			return;
		}

		parsedRows.push(result.data);
	});

	if (!parsedRows.length) {
		throw new Error(
			errors.length
				? `No valid rows found to import. Detected issues:\n${errors.join("\n")}`
				: "No valid rows found to import."
		);
	}

	if (errors.length) {
		throw new Error(`Import completed with validation errors:\n${errors.join("\n")}`);
	}

	return parsedRows;
};

