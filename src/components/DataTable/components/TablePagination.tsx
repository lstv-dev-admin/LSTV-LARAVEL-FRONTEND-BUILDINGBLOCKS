import { cn } from "@/lib/utils";

// Components
import { 
    Pagination, 
    PaginationContent, 
    PaginationEllipsis, 
    PaginationItem, 
    PaginationLink 
} from "../../ui/pagination";

// Others
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Props {
    siblings?: number;
    totalPages: number;
    currentPage: number;
    onPageChange?: (e: number) => void;
}

const TablePagination = (props: Props) => {
    const { currentPage, totalPages, onPageChange } = props;

    const generatePages = (
        currentPage: number,
        totalPages: number,
        siblings: number
    ) => {
        const totalNumbers = siblings * 2 + 3;
        const totalBlocks = totalNumbers + 2;

        if (totalPages <= totalBlocks) return Array.from({ length: totalPages }, (_, i) => i + 1);

        const startPage = Math.max(currentPage - siblings, 1);
        const endPage = Math.min(currentPage + siblings, totalPages);

        const pages = [
            ...(startPage > 2 ? [1, '...'] : startPage === 1 ? [] : [1]),
            ...Array.from(
                { length: endPage - startPage + 1 },
                (_, i) => startPage + i
            ),
            ...(endPage < totalPages - 1 ? ['...', totalPages] 
                : endPage === totalPages ? [] : [totalPages]),
        ];

        return pages;
    }

    const items = generatePages(currentPage, totalPages, props.siblings || 1);

    return (
        <Pagination>
            <PaginationContent className="gap-x-0 sm:gap-x-1">
                <PaginationItem>
                    <button 
                        onClick={() => onPageChange(currentPage - 1)}
                        className={cn(
                            currentPage === 1 ? 
                                "pointer-events-none opacity-50" : 
                                "hover:bg-accent hover:text-accent-foreground",
                            "flex items-center gap-1 text-xs p-2 rounded"
                        )}
                    >
                        <ChevronLeft className="h-4 w-4" />
                        <span className="hidden sm:block">Prev</span>
                    </button>
                </PaginationItem>
                
                {items.map((item, i) => (
                    <PaginationItem key={i}>
                        {item !== '...' ? (
                            <PaginationLink 
                                onClick={() => onPageChange(item as number)}
                                className={cn(
                                    "h-6 w-6 sm:w-8 sm:h-8",
                                    item === currentPage ? 'pointer-events-none': 'cursor-pointer',
                                    item === currentPage && 'bg-accent text-accent-foreground', 
                                )}
                            >
                                {item}
                            </PaginationLink>
                        ) : (
                            <PaginationEllipsis className="pointer-events-none h-6 w-6 sm:w-8 sm:h-8" />
                        )}
                    </PaginationItem>
                ))}

                <PaginationItem>
                    <button                                 
                        onClick={() => onPageChange(currentPage + 1)}
                        className={cn(
                            currentPage === totalPages ? 
                                "pointer-events-none opacity-50" : 
                                "hover:bg-accent hover:text-accent-foreground",
                            "flex items-center gap-1 text-xs p-2 rounded"
                        )}
                    >
                        <span className="hidden sm:block">Next</span>
                        <ChevronRight className="h-4 w-4" />
                    </button>
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    );
};

export default TablePagination;
