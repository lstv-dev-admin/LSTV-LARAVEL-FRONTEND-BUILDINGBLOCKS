import React, { useCallback, useMemo, useState, useRef } from "react";
import { DefaultValues, useForm } from "react-hook-form";

// Features
import { useGetMasterfilesQuery } from "@features/masterfile/hooks/queries";
import useCreateItemMutation from "@features/masterfile/hooks/mutations/useCreateItemMutation";
import useImportItemsMutation from "@features/masterfile/hooks/mutations/useImportItemsMutation";
import { MasterfilePageWrapperProps } from "@features/masterfile/types";
import { getMasterfileUrl } from "@features/masterfile/utils/index";
import { useExportMutation, usePrintMutation, useImportMutation } from "@features/shared/hooks/mutations";
import usePagination from "@features/shared/hooks/usePagination";
import { IApiAction } from "@features/shared/types";
import { handleFormError } from "@features/shared/utils/handleFormError";

// Components
import ActionTable from "@/components/DataTable/ActionTable";
import { IColumn } from "@/components/DataTable/types";
import PageHeader from "@/components/PageHeader.tsx";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import DeleteMasterfileItem from "./DeleteMasterfileItem";
import EditMasterfileItem from "./EditMasterfileItem";
import MasterfileForm from "./MasterfileForm";

// Utils
import toast from "@/lib/toast";
import { z } from "@/lib/validation";
import { exportTemplateExcel } from "@/utils/export-template-excel";

// Libs
import { zodResolver } from "@hookform/resolvers/zod";
import { SquarePen } from "lucide-react";

type HideAction = "print" | "export" | "create" | "update" | "delete" | "import";

const MasterfilePageWrapper = <
	TSchema extends z.ZodTypeAny,
	TRow extends object,
	TFormData extends Record<string, unknown> = z.infer<TSchema>
>(
	{
		title,
		description,
		endpoint,
		queryKey,
		invalidateQueryKeys = [],
		schema,
		columns,
		fields,
		onClickAdd,
		onClickEdit,
		primaryKey,
		hideActions = [],
	}: MasterfilePageWrapperProps<TSchema, TRow, TFormData>
) => {
	type FormValues = TFormData;
	const [isDialogOpen, setIsDialogOpen] = useState(false);
	const importInputRef = useRef<HTMLInputElement | null>(null);
	const hiddenActions = useMemo(() => new Set<HideAction>(hideActions), [hideActions]);
	const isActionHidden = useCallback((action: HideAction) => hiddenActions.has(action), [hiddenActions]);
	const { params, setSearch, setPage, setItemsPerPage } = usePagination();

	const { mutateAsync, isPending } = useCreateItemMutation<FormValues>({
		endpoint,
		queryKey,
		primaryKey,
		invalidateQueryKeys,
	});
	const { mutateAsync: exportMasterfile, isPending: isExporting } = useExportMutation({
		endpoint: getMasterfileUrl(endpoint),
		title,
	});
	const { mutateAsync: printMasterfile, isPending: isPrinting } = usePrintMutation({
		endpoint: getMasterfileUrl(endpoint),
		title,
	});

	const { mutateAsync: importItems } = useImportItemsMutation<FormValues>({
		endpoint,
		queryKey,
		primaryKey,
		invalidateQueryKeys,
	});

	const { mutateAsync: handleImportFile, isPending: isImporting } = useImportMutation<FormValues>({
		title,
		schema: schema as unknown as z.ZodType<FormValues>,
		importFn: importItems,
	});
    
	const {
		data,
		isLoading,
		isFetching,
		isError,
	} = useGetMasterfilesQuery<TRow>({
		endpoint,
		queryKey,
		params,
	});

	const defaultValues = useMemo(() => {
		return fields.reduce((acc, field) => {
			(acc as Record<string, unknown>)[field.name] = "";
			return acc;
		}, {} as DefaultValues<FormValues>);
	}, [fields]);

	const form = useForm<FormValues>({
		resolver: zodResolver(schema),
		defaultValues,
	});

	const onSubmit = async (values: FormValues) => {
		const toastId = toast.loading(`Submitting ${title}...`);
		try {
			await mutateAsync(values);
			form.reset();
			setIsDialogOpen(false);
			toast.success(`${title} successfully saved!`, { id: toastId });
		} catch (error) {
			handleFormError(error, form.setError, toastId, `Failed to save ${title}`);
			console.error("[MasterfileForm] Submit error:", error);
		}
	};

	const handleDownloadTemplate = useCallback(() => {
		if (schema instanceof z.ZodObject) {
			exportTemplateExcel(title, schema);
			toast.success(`${title} template downloaded successfully!`);
			return;
		}

		toast.error("This section doesn't support template downloads.");
	}, [schema, title]);

	const handleTriggerImport = useCallback(() => {
		if (isImporting) return;
		importInputRef.current?.click();
	}, [isImporting]);

	const handleImport = useCallback(async (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0];
		
		if (!file) return;

		event.target.value = "";
		await handleImportFile(file);
	}, [handleImportFile]);

	const ALL_COLUMNS = useMemo<IColumn<TRow>[]>(() => {
		return columns;
	}, [columns]);

	const renderSideAction = useCallback(
		(action: IApiAction, row: TRow) => {
			if ((action.type === "edit" || action.type === "update") && !isActionHidden("update")) {
				return onClickEdit ? (
					<Button
						key={action.type}
						size="icon"
						variant="outline"
						onClick={() => onClickEdit(row)}
					>
						<SquarePen className="w-4 h-4" />
					</Button>
				) : (
					<EditMasterfileItem
						key={action.type}
						title={title}
						fields={fields}
						primaryKey={primaryKey as Extract<keyof TRow, string>}
						schema={schema}
						endpoint={endpoint}
						queryKey={queryKey}
						invalidateQueryKeys={invalidateQueryKeys}
						row={row}
					/>
				);
			}

			if (action.type === "delete" && !isActionHidden("delete")) {
				const id = row[primaryKey as keyof TRow];
				if (typeof id !== "string" && typeof id !== "number") {
					console.error(`[MasterfilePageWrapper] Invalid id for ${title}:`, id);
					return null;
				}

				return (
					<DeleteMasterfileItem
						key={action.type}
						endpoint={endpoint}
						id={id}
						title={title}
						queryKey={queryKey}
						primaryKey={primaryKey}
						invalidateQueryKeys={invalidateQueryKeys}
					/>
				);
			}

			return null;
		},
		[
			endpoint,
			fields,
			invalidateQueryKeys,
			isActionHidden,
			onClickEdit,
			primaryKey,
			queryKey,
			schema,
			title,
		],
	)

    return (
        <div className="relative space-y-6">
            <MasterfileForm
                title={title}
                form={form}
                fields={fields}
                open={isDialogOpen}
                isLoading={isPending}
                onSubmit={(data) => onSubmit(data)}
                onCancel={() => {
                    form.reset();
                   	setIsDialogOpen(false);
                }}
            />
			<input
				type="file"
				ref={importInputRef}
				accept=".xlsx,.xls"
				onChange={handleImport}
				className="hidden"
			/>
			<PageHeader title={title} subTitle={description} />
			<Separator />
			<ActionTable
				columns={ALL_COLUMNS}
				data={data?.data?.items ?? []}
				itemSize={data?.data?.items_per_page}
				totalPages={data?.data?.total_pages}
				currentPage={data?.data?.current_page}
				isLoading={isLoading || isFetching}
				isError={isError}
				onSearch={(q) => setSearch(q)}
				onPageChange={(p) => setPage(p)}
				onItemsPerPageChange={(c) => setItemsPerPage(c)}
				actions={data?.data?.actions}
				renderSideAction={renderSideAction}
				onAction={async (type, _row) => {
                    const actions: Record<string, () => void> = {
                        "create": () => onClickAdd?.() ?? setIsDialogOpen(true),
                        "add": () => onClickAdd?.() ?? setIsDialogOpen(true),
                        "print": () => !isPrinting && printMasterfile(),                  
                        "export": () => !isExporting && exportMasterfile(),
                        "get-template": () => handleDownloadTemplate(),
                        "import-file": () => handleTriggerImport(),
                    };

					actions[type]?.();
				}}
			/>
        </div>
    );
};

export default MasterfilePageWrapper;