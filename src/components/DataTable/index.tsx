// Components
import { Card } from "../ui/card";
import { Input } from "../ui/input";
import { Skeleton } from "../ui/skeleton";
import TablePagination from "./components/TablePagination";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

// Types
import type { IColumn } from "./types";
export type { IColumn } from "./types";

// Others
import { cn } from "@/lib/utils";
import type { ClassValue } from "clsx";

interface TableProps<T> {
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

	// UI customization
	hidePagination?: boolean;
}

const DataTable = <T extends object>({
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

	// UI customization
	hidePagination = false,
}: TableProps<T>) => {
	const showEmptyState = !isLoading && !isError && data.length === 0;

	return (
		<div className="space-y-4">
			<Card>
                <Table>
                    <TableHeader>
                        <TableRow>
							{columns.map((col, index) => (
								<TableHead key={index} {...col?.slotProps?.header}> 
									{col.renderHeader ? col.renderHeader(data) : col.header}
								</TableHead>
							))}
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {isLoading &&
                            Array.from({ length: itemSize }, (_, index) => (
                                <TableRow key={`skeleton-${index}`}>
                                    <TableCell colSpan={columns.length}>
                                        <Skeleton className="h-10 w-full" />
                                    </TableCell>
                                </TableRow>
                            ))
                        }
                        {!isLoading && data?.map((row, rowIndex) => (
                            <TableRow key={rowIndex}>
                                {columns.map((col) => (
									<TableCell key={String(col.key)} {...col?.slotProps?.cell}>
										{col.render ? col.render(row) : String(row[col.key as keyof T] ?? "-")}
									</TableCell>
                                ))}
                            </TableRow>
                        ))}
                        {isError && (
                            <TableRow>
                                <TableCell
                                    colSpan={columns.length}
                                    className="text-center text-red-500 font-medium h-[365px]"
                                >
                                    {errorMessage}
                                </TableCell>
                            </TableRow>
                        )}
                        {showEmptyState && (
                            <TableRow>
                                <TableCell
                                    colSpan={columns.length}
                                    className="text-center font-medium h-[365px]"
                                >
                                    {emptyMessage}
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </Card>
            {(!isLoading && !isError && !hidePagination) && (
                <div className="grid grid-cols-1 justify-items-center sm:justify-items-stretch sm:grid-cols-2 lg:grid-cols-3 lg:items-center gap-2 lg:gap-0">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <span>Page</span>
                        <Input
                            min={1}
                            type="number"
                            max={totalPages}
                            value={currentPage ?? 1}
                            className="w-[70px] h-8 text-center"
                            onChange={(e) => {
                                const value = Number(e.target.value);
                                if (!isNaN(value) && value >= 1 && value <= totalPages) {
                                    onPageChange?.(value);
                                }
                            }}
                        />
                        <span className="whitespace-nowrap">of {totalPages}</span>
                    </div>
                    <div className={cn(
                        'order-3 sm:col-span-2 lg:col-span-1 lg:order-none',
                        data.length < 1 && totalPages <= 1 && 'invisible'
                    )}>
                        <TablePagination 
                            totalPages={totalPages} 
                            currentPage={currentPage} 
                            onPageChange={(e) => onPageChange?.(e)} 
                        />
                    </div>
                    <Select
                        value={String(itemSize)}
                        onValueChange={(e) => onItemsPerPageChange?.(Number(e))}
                    >
                        <SelectTrigger className="max-w-[120px] sm:justify-self-end">
                            <SelectValue placeholder="Items per page" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="5">5 per page</SelectItem>
                            <SelectItem value="10">10 per page</SelectItem>
                            <SelectItem value="20">20 per page</SelectItem>
                            <SelectItem value="50">50 per page</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            )}
        </div>
    );
};

export default DataTable;