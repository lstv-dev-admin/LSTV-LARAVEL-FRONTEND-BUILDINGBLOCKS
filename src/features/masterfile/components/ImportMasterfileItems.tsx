import { useRef } from "react";

// Features
import useImportItemsMutation from "@features/masterfile/hooks/mutations/useImportItemsMutation";
import { useImportMutation } from "@features/shared/hooks/mutations";

// Components
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

// Utils
import { exportTemplateExcel } from "@/utils/export-template-excel";
import toast from "@/lib/toast";
import { z } from "@/lib/validation";

// Libs
import { FileDown, FileSpreadsheet, FileUp } from "lucide-react";

type QueryKeyType = string | readonly unknown[] | { list: () => readonly unknown[] };

interface ImportMasterfileItemsProps<TSchema extends z.ZodTypeAny> {
	title: string;
	schema: TSchema;
	endpoint: string;
	queryKey: QueryKeyType;
	primaryKey: string;
	invalidateQueryKeys?: QueryKeyType[];
}

const ImportMasterfileItems = <
	TSchema extends z.ZodTypeAny,
	TFormData extends Record<string, unknown> = z.infer<TSchema>
>({ title, schema, endpoint, queryKey, primaryKey, invalidateQueryKeys = [] }: ImportMasterfileItemsProps<TSchema>) => {
	const importInputRef = useRef<HTMLInputElement | null>(null);

	const { mutateAsync: importItems } = useImportItemsMutation<TFormData>({
		endpoint,
		queryKey,
		primaryKey,
		invalidateQueryKeys,
	});

	const { mutateAsync: handleImportFile, isPending } = useImportMutation<TFormData>({
		title,
		schema: schema as unknown as z.ZodType<TFormData>,
		importFn: importItems,
	});

	const handleDownloadTemplate = () => {
		if (schema instanceof z.ZodObject) {
			exportTemplateExcel(title, schema);
			return;
		}

		toast.error("This section doesn't support template downloads.");
	};

	const handleImport = async (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0];
		
		if (!file) return;

		event.target.value = "";
		await handleImportFile(file);
	};

	return (
		<>
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button variant="outline" size="sm" disabled={isPending}>
						<FileSpreadsheet className="w-4 h-4 mr-2" />
						Upload Options
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent align="end" className="min-w-48">
					<DropdownMenuItem
						onSelect={() => {
							handleDownloadTemplate();
						}}
						className="gap-2"
					>
						<FileDown className="w-4 h-4" />
						Download template
					</DropdownMenuItem>
					<DropdownMenuItem
						disabled={isPending}
						onSelect={() => {
							if (!isPending) {
								importInputRef.current?.click();
							}
						}}
						className="gap-2"
					>
						<FileUp className="w-4 h-4" />
						Import data
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
			<input
				type="file"
				ref={importInputRef}
				accept=".xlsx,.xls"
				onChange={handleImport}
				className="hidden"
			/>
		</>
	);
};

export default ImportMasterfileItems;
