import { IColumn } from "@/components/DataTable/types";
import { z } from "@/lib/validation";
import { ComponentProps } from "react";

export interface IMasterfileEntity {
	record_id: number;
	created_at: string;
	updated_at: string;
}

type QueryKeyType = string | readonly unknown[] | { list: () => readonly unknown[] };

export interface IAutocompleteConfig {
	endpoint: string;
	queryKey: QueryKeyType;
	valueField?: string;
	labelField?: string;
	queryParams?: import("@features/shared/types").IListQueryParams;
	transformResponse?: (data: unknown[]) => { value: string; label: string }[];
}

export interface IMasterFileField extends ComponentProps<"input"> {
	label?: string;
	autocomplete?: boolean | IAutocompleteConfig;
	slotProps?: { wrapper?: ComponentProps<"div"> };
}

export interface MasterfilePageWrapperProps<
	TSchema extends z.ZodTypeAny,
	TRow extends object,
	_TFormData extends Record<string, unknown> = z.infer<TSchema>
> {
	title: string;
	description: string;
	endpoint: string;
	queryKey: QueryKeyType;
	invalidateQueryKeys?: QueryKeyType[];
	schema: TSchema;
	columns: IColumn<TRow>[];
	fields: IMasterFileField[];
    onClickAdd?: () => void;
    onClickEdit?: (row: TRow) => void;
	primaryKey: string;
	hideActions?: Array<"print" | "export" | "create" | "update" | "delete" | "import">;
}

export interface MasterfilePageWrapperRef {
	openDialog: () => void;
}

export interface EditMasterfileItemProps<
	TSchema extends z.ZodTypeAny,
	TRow extends object
> {
	title: string;
	schema: TSchema;
	fields: IMasterFileField[];
	endpoint: string;
	queryKey: QueryKeyType;
	invalidateQueryKeys?: QueryKeyType[];
	row: TRow;
	primaryKey: Extract<keyof TRow, string>;
}
