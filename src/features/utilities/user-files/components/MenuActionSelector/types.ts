export interface MenuItem {
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

export interface MenuActionSelectorProps {
	menuData: MenuItem[];
	actionsByMenu: Record<string, Array<{ id: number; label: string; icon: string; type: string; position: string }>>;
	userTypeOptions?: Array<{ value: string; label: string }>;
	disabled?: boolean;
}

