import { MenuItem } from "@features/utilities/user-files/types";

export const getAllChildMenuCodes = (menu: MenuItem): string[] => {
	const codes = [menu.code];
	if (menu.children && menu.children.length > 0) {
		menu.children.forEach((child) => {
			codes.push(...getAllChildMenuCodes(child));
		});
	}
	return codes;
};

export const getAllChildActionIds = (
	menu: MenuItem,
	actionsByMenu: Record<string, Array<{ id: number; label: string; icon: string; type: string; position: string }>>
): number[] => {
	const actionIds: number[] = [];

	// Get actions for current menu
	const menuActions = actionsByMenu[menu.code] || menu.actions || [];
	actionIds.push(...menuActions.map((a) => a.id));

	// Get actions for all children recursively
	if (menu.children && menu.children.length > 0) {
		menu.children.forEach((child) => {
			actionIds.push(...getAllChildActionIds(child, actionsByMenu));
		});
	}

	return actionIds;
};

export const collectAllMenuCodes = (menuData: MenuItem[]): string[] => {
	const codes: string[] = [];
	const collectCodes = (items: MenuItem[]) => {
		items.forEach((item) => {
			codes.push(item.code);
			if (item.children && item.children.length > 0) {
				collectCodes(item.children);
			}
		});
	};
	collectCodes(menuData);
	return codes;
};

export const collectAllActionIds = (menuData: MenuItem[]): number[] => {
	const ids: number[] = [];
	const collectActions = (items: MenuItem[]) => {
		items.forEach((item) => {
			if (item.actions && item.actions.length > 0) {
				ids.push(...item.actions.map((a) => a.id));
			}
			if (item.children && item.children.length > 0) {
				collectActions(item.children);
			}
		});
	};
	collectActions(menuData);
	return ids;
};

export const findMenuByActionId = (
	actionId: number,
	menuData: MenuItem[],
	actionsByMenu: Record<string, Array<{ id: number; label: string; icon: string; type: string; position: string }>>
): MenuItem | null => {
	for (const menu of menuData) {
		const menuActions = actionsByMenu[menu.code] || menu.actions || [];
		if (menuActions.some(a => a.id === actionId)) {
			return menu;
		}
		if (menu.children && menu.children.length > 0) {
			const found = findMenuByActionId(actionId, menu.children, actionsByMenu);
			if (found) return found;
		}
	}
	return null;
};

export const getParentMenuCodes = (
	menuCode: string,
	menuData: MenuItem[],
	parents: string[] = []
): string[] => {
	for (const menu of menuData) {
		if (menu.code === menuCode) {
			return parents;
		}
		if (menu.children && menu.children.length > 0) {
			const found = getParentMenuCodes(menuCode, menu.children, [...parents, menu.code]);
			if (found.length > 0 || menu.children.some(child => child.code === menuCode)) {
				return found.length > 0 ? found : [...parents, menu.code];
			}
		}
	}
	return [];
};

export const findMenuByCode = (menuCode: string, menuData: MenuItem[]): MenuItem | null => {
	for (const menu of menuData) {
		if (menu.code === menuCode) {
			return menu;
		}
		if (menu.children && menu.children.length > 0) {
			const found = findMenuByCode(menuCode, menu.children);
			if (found) return found;
		}
	}
	return null;
};

