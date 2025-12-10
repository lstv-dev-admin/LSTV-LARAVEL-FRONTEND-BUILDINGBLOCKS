// React
import { useCallback } from "react";

// Libs
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { mapClassToIcon } from "@/lib/fontawesome-icons";

// Components
import { Checkbox } from "@/components/ui/checkbox";

// Local
import { MenuItem as MenuItemType } from "@features/utilities/user-files/types";
import { ActionItem } from "./ActionItem";

interface MenuItemProps {
	menu: MenuItemType;
	level: number;
	isExpanded: boolean;
	isSelected: boolean;
	isIndeterminate: boolean;
	isDirectlySelected: boolean;
	isAdministrator: boolean;
	selectedActions: number[];
	menuActions: Array<{ id: number; label: string; icon: string; type: string; position: string }>;
	actionsByMenu: Record<string, Array<{ id: number; label: string; icon: string; type: string; position: string }>>;
	expandedMenus: Set<string>;
	isMenuSelected: (menu: MenuItemType) => boolean;
	isMenuIndeterminate: (menu: MenuItemType) => boolean;
	isMenuDirectlySelected: (menu: MenuItemType) => boolean;
	disabled?: boolean;
	onToggle: (menu: MenuItemType, checked: boolean) => void;
	onToggleAction: (actionId: number, checked: boolean) => void;
	onToggleExpand: (menuCode: string) => void;
}

export const MenuItem = ({
	menu,
	level,
	isExpanded,
	isSelected,
	isIndeterminate,
	isDirectlySelected,
	isAdministrator,
	selectedActions,
	menuActions,
	actionsByMenu,
	expandedMenus,
	isMenuSelected,
	isMenuIndeterminate,
	isMenuDirectlySelected,
	disabled = false,
	onToggle,
	onToggleAction,
	onToggleExpand,
}: MenuItemProps) => {
	const hasChildren = menu.children && menu.children.length > 0;
	const isIndirectlySelected = isSelected && !isDirectlySelected && !isAdministrator;

	return (
		<div className={level > 0 ? "ml-6 mt-2" : "mt-2"}>
			<div className={cn("flex items-center gap-2 py-1 rounded-sm px-1")}>
				{hasChildren && (
					<button
						type="button"
						onClick={() => !disabled && onToggleExpand(menu.code)}
						disabled={disabled}
						className="flex items-center justify-center w-4 h-4 hover:bg-accent rounded-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
					>
						<ChevronRight
							className={cn(
								"h-3 w-3 transition-transform",
								isExpanded && "rotate-90"
							)}
						/>
					</button>
				)}
				{!hasChildren && <div className="w-4" />}
				<Checkbox
					checked={isIndeterminate ? "indeterminate" : (isSelected || isAdministrator)}
					onCheckedChange={(checked) => !isAdministrator && !disabled && onToggle(menu, checked === true)}
					disabled={isAdministrator || disabled}
					className={cn(
						isIndirectlySelected && "data-[state=checked]:bg-black data-[state=checked]:border-black",
						isIndeterminate && !isIndirectlySelected && "data-[state=indeterminate]:bg-primary data-[state=indeterminate]:border-slate-800 border-primary-foreground ring-2 ring-white ring-offset-1 data-[state=indeterminate]:[box-shadow:inset_0_0_0_2px_white] text-primary"
					)}
				/>
				{menu.icon && (
					<FontAwesomeIcon 
						icon={mapClassToIcon(menu.icon)} 
						className="h-4 w-4 flex-shrink-0"
					/>
				)}
				<span className="text-sm font-medium">{menu.name}</span>
			</div>

			{/* Always show actions if they exist */}
			{menuActions && menuActions.length > 0 && (
				<div className={cn(
					"mt-1 space-y-1",
					level === 0 ? "ml-8" : "ml-12"
				)}>
					{menuActions.map((action) => (
						<ActionItem
							key={action.id}
							action={action}
							isSelected={selectedActions.includes(action.id) || isAdministrator}
							isAdministrator={isAdministrator}
							disabled={disabled}
							onToggle={(checked) => onToggleAction(action.id, checked)}
						/>
					))}
				</div>
			)}

			{/* Show children when expanded */}
			{hasChildren && isExpanded && (
				<div className="mt-1">
					{menu.children!.map((child) => {
						const childActions = (actionsByMenu?.[child.code] || child.actions || []);
						return (
							<MenuItem
								key={child.code}
								menu={child}
								level={level + 1}
								isExpanded={expandedMenus.has(child.code)}
								isSelected={isMenuSelected(child)}
								isIndeterminate={isMenuIndeterminate(child)}
								isDirectlySelected={isMenuDirectlySelected(child)}
								isAdministrator={isAdministrator}
								selectedActions={selectedActions}
								menuActions={childActions}
								actionsByMenu={actionsByMenu || {}}
								expandedMenus={expandedMenus}
								isMenuSelected={isMenuSelected}
								isMenuIndeterminate={isMenuIndeterminate}
								isMenuDirectlySelected={isMenuDirectlySelected}
								disabled={disabled}
								onToggle={onToggle}
								onToggleAction={onToggleAction}
								onToggleExpand={onToggleExpand}
							/>
						);
					})}
				</div>
			)}
		</div>
	);
};

