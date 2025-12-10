import { ReactNode } from "react";
import { Search } from "lucide-react";
import { Input } from "../../ui/input";
import { cn } from "@/lib/utils";
import { UseFormRegisterReturn } from "react-hook-form";
import { IApiAction } from "@/features/shared/types";

interface ActionTableHeaderProps<T> {
	onSearch?: (query: string) => void;
	searchRegister: UseFormRegisterReturn<"search">;
	isLoading?: boolean;
	isError?: boolean;
	headerActions: IApiAction[];
	renderActionButton: (action: IApiAction, row?: T) => ReactNode;
}

export function ActionTableHeader<T extends object>({
	onSearch,
	searchRegister,
	isLoading,
	isError,
	headerActions,
	renderActionButton,
}: ActionTableHeaderProps<T>) {
	if (headerActions.length === 0 && !onSearch) {
		return null;
	}

	return (
		<div
			className={cn(
				"flex gap-4 flex-col-reverse md:flex-row md:justify-between",
				headerActions.length === 0 && "justify-end",
				headerActions.length === 0 && !onSearch && "hidden",
			)}
		>
			{onSearch && (
				<div className="relative md:w-[300px] h-fit">
					<Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground pointer-events-none" />
					<Input
						placeholder="Search..."
						className="pl-10"
						{...searchRegister}
						disabled={isLoading || isError}
					/>
				</div>
			)}
			{headerActions.length > 0 && (
				<div className="grid sm:grid-cols-2 lg:flex lg:max-w-[800px] gap-2">
					{headerActions.map((action) => renderActionButton(action))}
				</div>
			)}
		</div>
	);
}
