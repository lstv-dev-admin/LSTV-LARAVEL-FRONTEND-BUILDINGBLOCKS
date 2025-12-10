import { useCallback, useMemo, useState } from "react";

interface UseRowSelectionOptions<T> {
	enableRowSelection?: boolean;
	getRowId?: (row: T) => string | number;
	selectedRowIds?: Set<string | number>;
	onSelectionChange?: (selectedIds: Set<string | number>) => void;
	selectAllMode?: 'page' | 'all';
	isRowSelectable?: (row: T) => boolean;
	data: T[];
}

export function useRowSelection<T extends object>({
	enableRowSelection = false,
	getRowId,
	selectedRowIds,
	onSelectionChange,
	selectAllMode = 'page',
	isRowSelectable = () => true,
	data,
}: UseRowSelectionOptions<T>) {
	// Internal selection state (for uncontrolled mode)
	const [internalSelectedIds, setInternalSelectedIds] = useState<Set<string | number>>(new Set());

	// Use controlled or uncontrolled state
	const isControlled = selectedRowIds !== undefined;
	const currentSelectedIds = isControlled ? selectedRowIds : internalSelectedIds;

	// Default getRowId function (uses index as fallback)
	const getId = useCallback((row: T, index: number) => {
		if (getRowId) {
			return getRowId(row);
		}
		return index;
	}, [getRowId]);

	// Get row IDs from current page data
	const currentPageRowIds = useMemo(() => {
		if (!enableRowSelection) return new Set<string | number>();
		return new Set(
			data.map((row, index) => {
				try {
					return getId(row, index);
				} catch {
					return index;
				}
			}).filter((id, index) => {
				const row = data[index];
				return row && isRowSelectable(row);
			})
		);
	}, [enableRowSelection, data, getId, isRowSelectable]);

	// Check if all selectable rows on current page are selected
	const allPageRowsSelected = useMemo(() => {
		if (!enableRowSelection || currentPageRowIds.size === 0) return false;
		return Array.from(currentPageRowIds).every(id => currentSelectedIds.has(id));
	}, [enableRowSelection, currentPageRowIds, currentSelectedIds]);

	// Check if some (but not all) rows are selected
	const someRowsSelected = useMemo(() => {
		if (!enableRowSelection || currentPageRowIds.size === 0) return false;
		const selectedCount = Array.from(currentPageRowIds).filter(id => currentSelectedIds.has(id)).length;
		return selectedCount > 0 && selectedCount < currentPageRowIds.size;
	}, [enableRowSelection, currentPageRowIds, currentSelectedIds]);

	// Handle selection change
	const handleSelectionChange = useCallback((newSelectedIds: Set<string | number>) => {
		if (isControlled) {
			onSelectionChange?.(newSelectedIds);
		} else {
			setInternalSelectedIds(newSelectedIds);
			onSelectionChange?.(newSelectedIds);
		}
	}, [isControlled, onSelectionChange]);

	// Toggle single row selection
	const toggleRowSelection = useCallback((rowId: string | number) => {
		const newSelectedIds = new Set(currentSelectedIds);
		if (newSelectedIds.has(rowId)) {
			newSelectedIds.delete(rowId);
		} else {
			newSelectedIds.add(rowId);
		}
		handleSelectionChange(newSelectedIds);
	}, [currentSelectedIds, handleSelectionChange]);

	// Toggle select all
	const toggleSelectAll = useCallback(() => {
		const newSelectedIds = new Set(currentSelectedIds);
		
		if (selectAllMode === 'page') {
			if (allPageRowsSelected) {
				currentPageRowIds.forEach(id => newSelectedIds.delete(id));
			} else {
				currentPageRowIds.forEach(id => newSelectedIds.add(id));
			}
		} else {
			if (allPageRowsSelected) {
				currentPageRowIds.forEach(id => newSelectedIds.delete(id));
			} else {
				currentPageRowIds.forEach(id => newSelectedIds.add(id));
			}
		}
		
		handleSelectionChange(newSelectedIds);
	}, [currentSelectedIds, currentPageRowIds, allPageRowsSelected, selectAllMode, handleSelectionChange]);

	return {
		currentSelectedIds,
		allPageRowsSelected,
		someRowsSelected,
		getId,
		toggleRowSelection,
		toggleSelectAll,
	};
}
