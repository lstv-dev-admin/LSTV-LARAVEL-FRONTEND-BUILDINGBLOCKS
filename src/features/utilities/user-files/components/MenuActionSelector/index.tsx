// React
import { useMemo, useCallback, useState, useEffect } from "react";
import { useFormContext } from "react-hook-form";

// Libs
import { User } from "lucide-react";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

// Features
import { UserFormData } from "@features/utilities/user-files/schema";

// Local
import { MenuActionSelectorProps, MenuItem } from "./types";
import { useMenuSelection } from "./hooks/useMenuSelection";
import { collectAllMenuCodes, collectAllActionIds } from "./utils/menuUtils";
import { MenuItem as MenuItemComponent } from "./components/MenuItem";

const MenuActionSelector = ({ menuData, actionsByMenu, userTypeOptions, disabled = false }: MenuActionSelectorProps) => {
	const { setValue, formState, watch } = useFormContext<UserFormData>();
	const [expandedMenus, setExpandedMenus] = useState<Set<string>>(new Set());

	const permissionError = formState.isSubmitted ? formState.errors.permission : undefined;
	const currentPermission = watch("permission") || { menu: [], menu_action: [] };

	const {
		selectedActions,
		isAdministrator,
		handleMenuToggle,
		handleActionToggle,
		isMenuSelected,
		isMenuIndeterminate,
		isMenuDirectlySelected,
	} = useMenuSelection({ menuData, actionsByMenu, userTypeOptions });

	// Collect all menu codes and action IDs
	const allMenuCodes = useMemo(() => collectAllMenuCodes(menuData), [menuData]);
	const allActionIds = useMemo(() => collectAllActionIds(menuData), [menuData]);

	// Auto-select all when Administrator/Supervisor is selected
	useEffect(() => {
		if (isAdministrator) {
			const currentMenus = new Set(currentPermission.menu || []);
			const currentActions = new Set(currentPermission.menu_action || []);
			
			const menusMatch = allMenuCodes.length === currentMenus.size && 
				allMenuCodes.every(code => currentMenus.has(code));
			const actionsMatch = allActionIds.length === currentActions.size && 
				allActionIds.every(id => currentActions.has(id));
			
			if (!menusMatch || !actionsMatch) {
				setValue("permission", {
					menu: allMenuCodes,
					menu_action: allActionIds,
				}, { shouldDirty: false });
			}
		}
	}, [isAdministrator, allMenuCodes, allActionIds, setValue, currentPermission]);

	const toggleMenu = useCallback((menuCode: string) => {
		setExpandedMenus((prev) => {
			const next = new Set(prev);
			if (next.has(menuCode)) {
				next.delete(menuCode);
			} else {
				next.add(menuCode);
			}
			return next;
		});
	}, []);

	const renderMenuItem = useCallback(
		(menu: MenuItem, level: number = 0) => {
			const isExpanded = expandedMenus.has(menu.code);
			const isSelected = isMenuSelected(menu);
			const isIndeterminate = isMenuIndeterminate(menu);
			// Get actions from menu.actions array first, then fallback to actionsByMenu map
			const actionsFromMenu = menu.actions || [];
			const actionsFromMap = actionsByMenu[menu.code] || [];
			const menuActions = actionsFromMenu.length > 0 ? actionsFromMenu : actionsFromMap;

			return (
				<MenuItemComponent
					key={menu.code}
					menu={menu}
					level={level}
					isExpanded={isExpanded}
					isSelected={isSelected}
					isIndeterminate={isIndeterminate}
					isDirectlySelected={isMenuDirectlySelected(menu)}
					isAdministrator={isAdministrator}
					selectedActions={selectedActions}
					menuActions={menuActions}
					actionsByMenu={actionsByMenu}
					expandedMenus={expandedMenus}
					isMenuSelected={isMenuSelected}
					isMenuIndeterminate={isMenuIndeterminate}
					isMenuDirectlySelected={isMenuDirectlySelected}
					disabled={disabled}
					onToggle={handleMenuToggle}
					onToggleAction={handleActionToggle}
					onToggleExpand={toggleMenu}
				/>
			);
		},
		[
            expandedMenus, 
            isMenuSelected, 
            isMenuIndeterminate, 
            isMenuDirectlySelected, 
            handleMenuToggle, 
            handleActionToggle, 
            toggleMenu, 
            isAdministrator, 
            selectedActions, 
            actionsByMenu, 
            disabled
        ]
	);

	return (
		<div>
			<Alert variant={permissionError ? "destructive" : "default"}>
				<User className="h-4 w-4" />
				<AlertTitle>User Access</AlertTitle>
				<AlertDescription>
					Controls the user's permissions and visibility. Selecting a parent menu automatically selects all children and their actions.
				</AlertDescription>
			</Alert>
			{permissionError && (
				<p className="text-sm text-destructive font-medium mt-1">
					{permissionError.message as string || "User Access is required"}
				</p>
			)}
			<Separator className="my-4" />
			<div className={cn("h-[400px]")}>
				<ScrollArea className="h-full">
					<div className="space-y-2 p-2">
						{menuData.map((menu) => renderMenuItem(menu))}
					</div>
				</ScrollArea>
			</div>
		</div>
	);
};

export default MenuActionSelector;