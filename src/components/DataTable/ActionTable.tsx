import { ReactNode, useCallback, useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";

// Features
import { IApiAction } from "@/features/shared/types";

// Components
import { ActionTableHeader } from "./components/ActionTableHeader";
import DataTable, { IColumn } from "./index";

// Utils
import { buildSideActionButtons, renderActionButton } from "./utils/actionHelpers";
import { buildColumns } from "./utils/columnHelpers";
import { useRowSelection } from "./hooks/useRowSelection";

// Libs
import { useDebounce } from "use-debounce";

interface ActionTableProps<T> {
	// Core data
	columns: IColumn<T>[];
	data: T[];

	// Pagination configuration
	currentPage?: number;
	totalPages?: number;
	itemSize?: number;
	hasNextPage?: boolean;

	// Loading and error states
	isLoading?: boolean;
	isError?: boolean;
	errorMessage?: string;
	emptyMessage?: string;

	// Event handlers
	onPageChange?: (page: number) => void;
	onItemsPerPageChange?: (count: number) => void;
	onSearch?: (query: string) => void;

	// Actions
	actions?: IApiAction[];
	onAction?: (type: string, row?: T) => void;
	renderAction?: (action: IApiAction, row?: T) => ReactNode;
	renderSideAction?: (action: IApiAction, row: T) => ReactNode;
	disabledActions?: string[] | ((row: T) => string[]);

	// Row selection
	enableRowSelection?: boolean;
	getRowId?: (row: T) => string | number;
	selectedRowIds?: Set<string | number>;
	onSelectionChange?: (selectedIds: Set<string | number>) => void;
	selectAllMode?: 'page' | 'all';
	isRowSelectable?: (row: T) => boolean;

	// UI customization
	hidePagination?: boolean;
};

const ActionTable = <T extends object>({
	// Core data
	columns,
	data = [],

	// Pagination configuration
	currentPage,
	totalPages = 1,
	itemSize = 5,
	hasNextPage,

	// Loading and error states
	isLoading,
	isError,
	errorMessage = "Something went wrong. Please try again.",
	emptyMessage = "No data found.",

	// Event handlers
	onPageChange,
	onItemsPerPageChange,
	onSearch,

	// Actions
	actions = [],
	onAction,
	renderAction,
	renderSideAction,
	disabledActions,

	// Row selection
	enableRowSelection = false,
	getRowId,
	selectedRowIds,
	onSelectionChange,
	selectAllMode = 'page',
	isRowSelectable = () => true,

	// UI customization
	hidePagination = false,
}: ActionTableProps<T>) => {
	// Row selection hook
	const {
		currentSelectedIds,
		allPageRowsSelected,
		someRowsSelected,
		getId,
		toggleRowSelection,
		toggleSelectAll,
	} = useRowSelection({
		enableRowSelection,
		getRowId,
		selectedRowIds,
		onSelectionChange,
		selectAllMode,
		isRowSelectable,
		data,
	});

	const { register, watch } = useForm<{ search: string }>({
		defaultValues: { search: "" },
	});

	const searchValue = watch("search");
	const [debouncedSearch] = useDebounce(searchValue.trim(), 500);

	useEffect(() => {
		if (onSearch) {
			onSearch(debouncedSearch);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [debouncedSearch]);

	const getFilteredActions = useCallback((actionsList: IApiAction[], row?: T) => {
		if (!disabledActions) return actionsList;
		
		const disabled = typeof disabledActions === "function" ? (row ? disabledActions(row) : []) : disabledActions;
		
		return actionsList.filter((action) => !disabled.includes(action.type || ""));
	}, [disabledActions]);

	const headerActions = useMemo(() => actions.filter((action) => action.position === "header"),
		[actions]
	);
	const sideActions = useMemo(() => {
		return actions.filter((action) => action.position === "side");
	}, [actions]);

	const handleRenderActionButton = useCallback(
		(action: IApiAction, row?: T) => {return renderActionButton({ action, row, renderAction, onAction })},
		[renderAction, onAction]
	);

	const handleBuildSideActionButtons = useCallback(
		(row: T) => {
			const filteredSideActions = getFilteredActions(sideActions, row);
			return buildSideActionButtons({ sideActions: filteredSideActions, row, renderSideAction, onAction });
		},
		[sideActions, renderSideAction, onAction, getFilteredActions]
	);

	const ALL_COLUMNS = useMemo(
		() =>
			buildColumns({
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
				buildSideActionButtons: handleBuildSideActionButtons,
			}),
		[
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
			handleBuildSideActionButtons,
		]
	);

	return (
		<div className="space-y-4">
			<ActionTableHeader
				onSearch={onSearch}
				searchRegister={register("search")}
				isLoading={isLoading}
				isError={isError}
				headerActions={headerActions}
				renderActionButton={handleRenderActionButton}
			/>
			<DataTable
				columns={ALL_COLUMNS}
				data={data}
				currentPage={currentPage}
				totalPages={totalPages}
				itemSize={itemSize}
				hasNextPage={hasNextPage}
				isLoading={isLoading}
				isError={isError}
				errorMessage={errorMessage}
				emptyMessage={emptyMessage}
				onPageChange={onPageChange}
				onItemsPerPageChange={onItemsPerPageChange}
				hidePagination={hidePagination}
			/>
		</div>
	);
};

export default ActionTable;