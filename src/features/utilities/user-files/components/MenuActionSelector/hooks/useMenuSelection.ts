// React
import { useMemo, useCallback } from "react";
import { useWatch, useFormContext } from "react-hook-form";

// Features
import { UserFormData } from "@features/utilities/user-files/schema";
import { MenuItem } from "@features/utilities/user-files/types";
import { getAllChildMenuCodes, getAllChildActionIds, findMenuByActionId, getParentMenuCodes, findMenuByCode } from "../utils/menuUtils";

interface UseMenuSelectionProps {
	menuData: MenuItem[];
	actionsByMenu: Record<string, Array<{ id: number; label: string; icon: string; type: string; position: string }>>;
	userTypeOptions?: Array<{ value: string; label: string }>;
}

export const useMenuSelection = ({
	menuData,
	actionsByMenu,
	userTypeOptions,
}: UseMenuSelectionProps) => {
	const { setValue } = useFormContext<UserFormData>();
	const permission = useWatch({ name: "permission" }) || { menu: [], menu_action: [] };
	const userType = useWatch({ name: "user_type" });

	const selectedMenus = useMemo(() => permission.menu || [], [permission.menu]);
	const selectedActions = useMemo(() => permission.menu_action || [], [permission.menu_action]);

	const isAdministrator = useMemo(() => {
		if (!userType || !userTypeOptions) return false;
		const selectedType = userTypeOptions.find(
			(type) => type.value === String(userType)
		);
		const label = selectedType?.label.toLowerCase() || '';
		return label.includes('administrator') || label.includes('supervisor');
	}, [userType, userTypeOptions]);

	const getMenusFromActions = useCallback((actionIds: number[]): Set<string> => {
		const menus = new Set<string>();
		actionIds.forEach(actionId => {
			const menu = findMenuByActionId(actionId, menuData, actionsByMenu);
			if (menu) {
				menus.add(menu.code);
				const parentCodes = getParentMenuCodes(menu.code, menuData);
				parentCodes.forEach(code => menus.add(code));
			}
		});
		return menus;
	}, [menuData, actionsByMenu]);

	const handleMenuToggle = useCallback(
		(menu: MenuItem, checked: boolean) => {
			const childMenuCodes = getAllChildMenuCodes(menu);
			const childActionIds = getAllChildActionIds(menu, actionsByMenu);

			const currentMenus = new Set(selectedMenus);
			const currentActions = new Set(selectedActions);

			if (checked) {
				childMenuCodes.forEach((code) => currentMenus.add(code));
				childActionIds.forEach((id) => currentActions.add(id));
				const parentCodes = getParentMenuCodes(menu.code, menuData);
				parentCodes.forEach(code => currentMenus.add(code));
			} else {
				childMenuCodes.forEach((code) => currentMenus.delete(code));
				childActionIds.forEach((id) => currentActions.delete(id));
				
				const parentCodes = getParentMenuCodes(menu.code, menuData);
				
				const isMenuFullySelected = (menuItem: MenuItem): boolean => {
					const childCodes = getAllChildMenuCodes(menuItem);
					const childActionIds = getAllChildActionIds(menuItem, actionsByMenu);
					const allChildrenSelected = childCodes.every(code => currentMenus.has(code));
					const allActionsSelected = childActionIds.length === 0 || childActionIds.every(id => currentActions.has(id));
					return allChildrenSelected && allActionsSelected;
				};
				
				const checkAndRemoveParent = (parentCode: string) => {
					const parentMenu = findMenuByCode(parentCode, menuData);
					if (!parentMenu) return;
					
					if (!isMenuFullySelected(parentMenu)) {
						currentMenus.delete(parentCode);
						const grandParentCodes = getParentMenuCodes(parentCode, menuData);
						grandParentCodes.forEach(gpCode => checkAndRemoveParent(gpCode));
					}
				};
				
				parentCodes.forEach(parentCode => checkAndRemoveParent(parentCode));
			}

			const menusFromActions = getMenusFromActions(Array.from(currentActions) as number[]);
			menusFromActions.forEach(code => currentMenus.add(code));

			setValue("permission", {
				menu: Array.from(currentMenus) as string[],
				menu_action: Array.from(currentActions) as number[],
			}, { shouldDirty: true });
		},
		[selectedMenus, selectedActions, actionsByMenu, menuData, setValue, getMenusFromActions]
	);

	const handleActionToggle = useCallback(
		(actionId: number, checked: boolean) => {
			const currentActions = new Set(selectedActions);
			const currentMenus = new Set(selectedMenus);

			if (checked) {
				currentActions.add(actionId);
				const menu = findMenuByActionId(actionId, menuData, actionsByMenu);
				if (menu) {
					currentMenus.add(menu.code);
					const parentCodes = getParentMenuCodes(menu.code, menuData);
					parentCodes.forEach(code => currentMenus.add(code));
				}
			} else {
				currentActions.delete(actionId);
				const menu = findMenuByActionId(actionId, menuData, actionsByMenu);
				if (menu) {
					const menuActions = actionsByMenu[menu.code] || menu.actions || [];
					const allActionsSelected = menuActions.length === 0 || menuActions.every(a => currentActions.has(a.id));
					
					if (!allActionsSelected) {
						currentMenus.delete(menu.code);
						const parentCodes = getParentMenuCodes(menu.code, menuData);
						
						const isMenuFullySelected = (menuItem: MenuItem): boolean => {
							const childCodes = getAllChildMenuCodes(menuItem);
							const childActionIds = getAllChildActionIds(menuItem, actionsByMenu);
							const allChildrenSelected = childCodes.every(code => currentMenus.has(code));
							const allActionsSelected = childActionIds.length === 0 || childActionIds.every(id => currentActions.has(id));
							return allChildrenSelected && allActionsSelected;
						};
						
						const checkAndRemoveParent = (parentCode: string) => {
							const parentMenu = findMenuByCode(parentCode, menuData);
							if (!parentMenu) return;
							
							if (!isMenuFullySelected(parentMenu)) {
								currentMenus.delete(parentCode);
								const grandParentCodes = getParentMenuCodes(parentCode, menuData);
								grandParentCodes.forEach(gpCode => checkAndRemoveParent(gpCode));
							}
						};
						
						parentCodes.forEach(parentCode => checkAndRemoveParent(parentCode));
					}
				}
			}
			
			const menusFromActions = getMenusFromActions(Array.from(currentActions) as number[]);
			menusFromActions.forEach(code => currentMenus.add(code));

			setValue("permission", {
				menu: Array.from(currentMenus) as string[],
				menu_action: Array.from(currentActions) as number[],
			}, { shouldDirty: true });
		},
		[selectedActions, selectedMenus, menuData, actionsByMenu, setValue, getMenusFromActions]
	);

	const isMenuSelected = useCallback(
		(menu: MenuItem) => {
			if (isAdministrator) return true;
			const childCodes = getAllChildMenuCodes(menu);
			const childActionIds = getAllChildActionIds(menu, actionsByMenu);
			const allChildrenSelected = childCodes.length > 0 && childCodes.every((code) => selectedMenus.includes(code));
			const allActionsSelected = childActionIds.length === 0 || childActionIds.every((id) => selectedActions.includes(id));
			return allChildrenSelected && allActionsSelected;
		},
		[selectedMenus, selectedActions, actionsByMenu, isAdministrator]
	);

	const isMenuIndeterminate = useCallback(
		(menu: MenuItem) => {
			if (isAdministrator) return false;
			const isFullySelected = isMenuSelected(menu);
			if (isFullySelected) return false;
			const childCodes = getAllChildMenuCodes(menu);
			const childActionIds = getAllChildActionIds(menu, actionsByMenu);
			const someChildrenSelected = childCodes.some((code) => selectedMenus.includes(code));
			const someActionsSelected = childActionIds.length > 0 && childActionIds.some((id) => selectedActions.includes(id));
			return someChildrenSelected || someActionsSelected;
		},
		[selectedMenus, selectedActions, actionsByMenu, isAdministrator, isMenuSelected]
	);

	const isMenuDirectlySelected = useCallback(
		(menu: MenuItem) => {
			if (isAdministrator) return true;
			return selectedMenus.includes(menu.code);
		},
		[selectedMenus, isAdministrator]
	);

	return {
		selectedMenus,
		selectedActions,
		isAdministrator,
		handleMenuToggle,
		handleActionToggle,
		isMenuSelected,
		isMenuIndeterminate,
		isMenuDirectlySelected,
	};
};

