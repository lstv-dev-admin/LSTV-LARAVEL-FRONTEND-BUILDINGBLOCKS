import { useMemo } from "react";
import useGetMenuWithActionsQuery from "@/features/shared/hooks/queries/useGetMenuWithActionsQuery";
import { ApiMenuItem } from "@/features/shared/api";

interface MenuItem {
	code: string;
	name: string;
	icon: string | null;
	parent_code: string | null;
	path: string | null;
	actions: Array<{
		id: number;
		label: string;
		icon: string;
		type: string;
		position: string;
	}>;
	children: MenuItem[];
}

const buildMenuTree = (items: MenuItem[]): MenuItem[] => {
	const map = new Map<string, MenuItem>();

	items.forEach((item) => {
		map.set(item.code, {
			...item,
			children: [],
		});
	});

	const tree: MenuItem[] = [];

	items.forEach((item) => {
		const parentCode = item.parent_code;
		if (parentCode && map.has(parentCode)) {
			const parent = map.get(parentCode)!;
			const current = map.get(item.code)!;
			parent.children.push(current);
		} else {
			tree.push(map.get(item.code)!);
		}
	});

	return tree;
};

// Transform API response to MenuItem format
const transformMenuItem = (item: ApiMenuItem): MenuItem => {
	return {
		code: item.code,
		name: item.name,
		icon: item.icon,
		parent_code: item.parent_code,
		path: item.path,
		actions: (item.actions || []).map((action) => ({
			id: action.id,
			label: action.action_label || action.label || action.action_name || `Action ${action.id}`,
			icon: action.icon || action.action_name,
			type: action.action_name,
			position: "side",
		})),
		children: item.children ? item.children.map(transformMenuItem) : [],
	};
};

interface UseMenuWithActionsOptions {
	enabled?: boolean;
}

export const useMenuWithActions = (options?: UseMenuWithActionsOptions) => {
	const { data: apiMenuItems, isLoading, refetch } = useGetMenuWithActionsQuery({
		enabled: options?.enabled ?? false,
		refetchOnMount: false,
	});

	const menuItems = useMemo(() => {
		if (!apiMenuItems || apiMenuItems.length === 0) {
			return [];
		}

		// Debug: Check raw API response for actions
		if (apiMenuItems[0]?.actions && apiMenuItems[0].actions.length > 0) {
			console.log('Raw API action sample:', apiMenuItems[0].actions[0]);
		}

		const transformedItems: MenuItem[] = apiMenuItems.map(transformMenuItem);
		
		// Debug: Check if actions have icons
		if (transformedItems[0]?.actions && transformedItems[0].actions.length > 0) {
			console.log('Sample action from transformed data:', transformedItems[0].actions[0]);
		}

		return transformedItems;
	}, [apiMenuItems]);

	const menuTree = useMemo(() => {
		// The API already returns a tree structure with nested children
		// Use it directly - the transformMenuItem function already handles the recursive structure
		return menuItems;
	}, [menuItems]);

	const actionsByMenu = useMemo(() => {
		const map: Record<string, Array<{ id: number; label: string; icon: string; type: string; position: string }>> = {};
		
		const collectActions = (items: MenuItem[]) => {
			items.forEach((item) => {
				// Always set actions, even if empty array, to ensure the key exists
				if (item.actions && item.actions.length > 0) {
					map[item.code] = item.actions;
				}
				// Recursively collect from children
				if (item.children && item.children.length > 0) {
					collectActions(item.children);
				}
			});
		};
		
		collectActions(menuTree);
		return map;
	}, [menuTree]);

	return {
		menuTree,
		actionsByMenu,
		isLoading,
		refetch,
	};
};

