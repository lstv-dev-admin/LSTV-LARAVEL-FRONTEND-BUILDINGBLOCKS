import { ComponentProps, useEffect, useMemo, useRef, useState } from "react";
import { Control, FieldPath, FieldValues } from "react-hook-form";

// Features
import useGetInfiniteListQuery from "@features/shared/hooks/queries/useGetInfiniteListQuery";
import { IListQueryParams } from "@features/shared/types";

// Components
import { Button } from "@/components/ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

// Utils
import { cn } from "@/lib/utils";

// Libs
import { Check, ChevronsUpDown, Loader2 } from "lucide-react";
import { useDebounce } from "use-debounce";

interface AsyncSelectFieldProps<TFieldValues extends FieldValues, TRow extends object> extends Omit<ComponentProps<"input">, "name"> {
	name: FieldPath<TFieldValues>;
	control: Control<TFieldValues>;
	label?: string;
	placeholder?: string;
	required?: boolean;
	disabled?: boolean;
	slotProps?: { wrapper?: ComponentProps<"div"> };

	// API Configuration
	endpoint: string;
	queryKey: string | string[];
	valueField?: string;
	labelField?: string;
	params?: Omit<IListQueryParams, "page" | "search">;
	perPage?: number;

	// Search Configuration
	enableSearch?: boolean;
	searchPlaceholder?: string;

	// Transform
	transformItem?: (item: TRow) => { value: string; label: string };
	onValueChange?: (value: string) => void;
}

const AsyncSelectField = <TFieldValues extends FieldValues, TRow extends object>({
	name,
	control,
	label,
	placeholder = "Select option...",
	required,
	disabled,
	slotProps,
	endpoint,
	queryKey,
	valueField = "id",
	labelField = "name",
	params,
	perPage = 10,
	enableSearch = false,
	searchPlaceholder = "Search...",
	transformItem,
	onValueChange,
}: AsyncSelectFieldProps<TFieldValues, TRow>) => {
	const [open, setOpen] = useState(false);
	const [searchValue, setSearchValue] = useState("");
	const [debouncedSearch] = useDebounce(searchValue, 500);
	const [popoverWidth, setPopoverWidth] = useState<number | undefined>(undefined);
	const scrollContainerRef = useRef<HTMLDivElement>(null);
	const triggerRef = useRef<HTMLButtonElement>(null);

	const queryParams = useMemo(() => ({
		...params,
		per_page: perPage,
		...(enableSearch && debouncedSearch ? { search: debouncedSearch } : {}),
	}), [params, perPage, enableSearch, debouncedSearch]);

	const {
		data,
		fetchNextPage,
		hasNextPage,
		isFetchingNextPage,
		isLoading,
		isError,
	} = useGetInfiniteListQuery<TRow>({
		endpoint,
		queryKey,
		params: queryParams,
		enabled: open,
	});

	const allItems = useMemo(() => {
		if (!data?.pages) return [];
		return data.pages.flatMap(page => page?.data?.items ?? []);
	}, [data]);

	const options = useMemo(() => {
		if (!allItems.length) return [];
		return allItems.map(item => {
			if (transformItem) {
				return transformItem(item);
			}
			const value = item[valueField as keyof TRow];
			const label = item[labelField as keyof TRow];
			return {
				value: String(value ?? ""),
				label: String(label ?? ""),
			};
		});
	}, [allItems, transformItem, valueField, labelField]);

	const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
		const target = e.currentTarget;
		const scrollBottom = target.scrollHeight - target.scrollTop - target.clientHeight;
		
		if (scrollBottom < 100 && hasNextPage && !isFetchingNextPage) {
			fetchNextPage();
		}
	};

	useEffect(() => {
		if (open && triggerRef.current) {
			setPopoverWidth(triggerRef.current.offsetWidth);
		}
	}, [open]);

	return (
		<FormField
			control={control}
			name={name}
			render={({ field, fieldState }) => {
				const selectedOption = options.find((option) => option.value === field.value);

				return (
					<FormItem {...slotProps?.wrapper} className={cn("space-y-1", slotProps?.wrapper?.className)}>
						{label && (
							<FormLabel className="flex gap-1 mb-2 w-fit">
								{label}
								{required && <span className="text-destructive">*</span>}
							</FormLabel>
						)}
						<Popover open={open} onOpenChange={setOpen} modal={false}>
							<PopoverTrigger asChild>
								<FormControl>
									<Button
										ref={triggerRef}
										variant="outline"
										role="combobox"
										aria-expanded={open}
										disabled={disabled || isLoading}
										className={cn(
											"w-full h-10",
											isLoading && options.length === 0 ? "justify-center" : "justify-between",
											"hover:bg-background hover:text-foreground",
											"ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2",
											fieldState.error?.message && "border-destructive/50 ring-destructive focus-visible:ring-destructive/50",
											!field.value && "text-muted-foreground",
										)}
									>
										{isLoading && options.length === 0 ? (
											<>
												<Loader2 className="mr-2 h-4 w-4 animate-spin" />
												Loading...
											</>
										) : (
											<>
												{selectedOption?.label ?? placeholder}
												<ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
											</>
										)}
									</Button>
								</FormControl>
							</PopoverTrigger>
							<PopoverContent 
								align="start"
								className="p-0 !z-[100] pointer-events-auto" 
								onWheel={(e) => e.stopPropagation()}
								style={{ ...(popoverWidth ? { width: `${popoverWidth}px` } : {}) }}
							>
								<Command shouldFilter={false}>
									{enableSearch && (
										<CommandInput
											placeholder={searchPlaceholder}
											value={searchValue}
											onValueChange={setSearchValue}
											className="h-9"
										/>
									)}
									<CommandList
										ref={scrollContainerRef}
										onScroll={handleScroll}
										onWheel={(e) => {
											// Ensure wheel events work inside dialogs by stopping propagation to prevent dialog blocking
											e.stopPropagation();
										}}
										className="max-h-[300px] scrollbar-hide"
									>
											{isLoading && options.length === 0 ? (
												<div className="flex items-center justify-center gap-2 p-4 text-sm text-muted-foreground">
													<Loader2 className="h-4 w-4 animate-spin" />
													<p>Loading options...</p>
												</div>
											) : isError ? (
												<CommandEmpty>Failed to load options. Please try again.</CommandEmpty>
											) : options.length === 0 ? (
												<CommandEmpty>No options found.</CommandEmpty>
											) : (
												<CommandGroup>
													{options.map((option) => (
														<CommandItem
															key={option.value}
															value={option.value}
															onSelect={(currentValue) => {
																field.onChange(currentValue === field.value ? "" : currentValue);
																onValueChange?.(currentValue === field.value ? "" : currentValue);
																setOpen(false);
															}}
														>
															{option.label}
															<Check
																className={cn(
																	"ml-auto h-4 w-4",
																	field.value === option.value ? "opacity-100" : "opacity-0"
																)}
															/>
														</CommandItem>
													))}
													{isFetchingNextPage && (
														<div className="flex items-center justify-center gap-2 p-2 text-sm text-muted-foreground">
															<Loader2 className="h-4 w-4 animate-spin" />
															<p>Loading more...</p>
														</div>
													)}
												</CommandGroup>
											)}
									</CommandList>
								</Command>
							</PopoverContent>
						</Popover>
						<FormMessage />
					</FormItem>
				);
			}}
		/>
	);
};

export default AsyncSelectField;