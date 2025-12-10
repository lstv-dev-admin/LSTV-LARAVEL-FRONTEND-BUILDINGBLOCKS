import { Children, ReactNode } from "react";

// Features
import { IApiAction } from "@/features/shared";

// Components
import { Checkbox } from "../../ui/checkbox";
import { IColumn } from "../types";

// Utils
import { cn } from "@/lib/utils";

interface BuildColumnsOptions<T> {
	columns: IColumn<T>[];
	enableRowSelection: boolean;
	allPageRowsSelected: boolean;
	someRowsSelected: boolean;
	toggleSelectAll: () => void;
	data: T[];
	getId: (row: T, index: number) => string | number;
	currentSelectedIds: Set<string | number>;
	isRowSelectable: (row: T) => boolean;
	toggleRowSelection: (rowId: string | number) => void;
	sideActions: IApiAction[];
	renderSideAction?: (action: IApiAction, row: T) => ReactNode;
	onAction?: (type: string, row?: T) => void;
	buildSideActionButtons: (row: T) => ReactNode[];
}

export function buildColumns<T extends object>({
	columns,
	enableRowSelection,
	allPageRowsSelected,
	someRowsSelected,
	toggleSelectAll,
	data,
	getId,
	currentSelectedIds,
	isRowSelectable,
	toggleRowSelection,
	sideActions,
	buildSideActionButtons,
}: BuildColumnsOptions<T>): IColumn<T>[] {
	const hasExistingActionColumn = columns.some((column) => column.key === "action");
	const shouldShowRowActions = sideActions.length > 0;
	const hasSelectionColumn = enableRowSelection && columns.some((col) => col.key === "__selection");

	// Build selection column if enabled and not already exists
	const selectionColumn: IColumn<T> | null = enableRowSelection && !hasSelectionColumn ? {
		key: "__selection" as keyof T,
		header: "",
		renderHeader: () => (
			<Checkbox
				checked={allPageRowsSelected}
				onCheckedChange={toggleSelectAll}
				aria-label="Select all rows"
				className={cn(someRowsSelected && "data-[state=checked]:bg-primary/50")}
			/>
		),
		slotProps: {
			header: { className: "w-12" },
			cell: { className: "" },
		},
		render: (row: T) => {
			const rowIndex = data.indexOf(row);
			const rowId = getId(row, rowIndex);
			const isSelected = currentSelectedIds.has(rowId);
			const isSelectable = isRowSelectable(row);

			return (
				<Checkbox
					checked={isSelected}
					onCheckedChange={() => isSelectable && toggleRowSelection(rowId)}
					disabled={!isSelectable}
					aria-label={`Select row ${rowIndex + 1}`}
				/>
			);
		},
	} : null;

	const result: IColumn<T>[] = [];

	// Add selection column first if enabled
	if (selectionColumn) {
		result.push(selectionColumn);
	}

	// Process existing columns
	if (hasExistingActionColumn) {
		result.push(...columns.map((column) => {
			if (column.key !== "action") {
				return column;
			}

			const baseRender = column.render;

			return {
				...column,
				render: (row: T) => {
					const customChildren = baseRender ? Children.toArray(baseRender(row)) : [];
					const sideActionButtons = buildSideActionButtons(row);
					const combined = [...customChildren, ...sideActionButtons];

					if (!combined.length) {
						return null;
					}

					return <div className="flex gap-3 justify-end">{combined}</div>;
				},
			};
		}));
	} else {
		result.push(...columns);
	}

	// Add action column if needed
	if (!hasExistingActionColumn && shouldShowRowActions) {
		result.push({
			key: "action" as keyof T,
			header: "Action",
			slotProps: { header: { className: "flex justify-end items-center" } },
			render: (row: T) => {
				const sideActionButtons = buildSideActionButtons(row);

				if (!sideActionButtons.length) {
					return null;
				}

				return <div className="flex gap-3 justify-end">{sideActionButtons}</div>;
			},
		});
	}

	return result;
}
