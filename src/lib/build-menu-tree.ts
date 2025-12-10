export interface IMenuItem {
	id: string;
	title: string;
	description?: string | null;
	icon?: string | null;
	path?: string | null;
	parent_id?: string | null;
	visible_to_roles?: string[];
	is_active?: boolean;
	display_order?: number;
	children?: IMenuItem[];
	hasChildren?: boolean;
	shouldAutoExpand?: boolean;
}

export const buildMenuTree = (items: IMenuItem[]): IMenuItem[] => {
	const map = new Map<string, IMenuItem>();

	items.forEach((item) => {
		map.set(item.id, {
			...item,
			children: [],
			hasChildren: false,
			shouldAutoExpand: false
		});
	});

	const tree: IMenuItem[] = [];

	items.forEach((item) => {
		const parentId = item.parent_id;
		if (parentId && map.has(parentId)) {
			const parent = map.get(parentId)!;
			const current = map.get(item.id)!;
			parent.children!.push(current);
			parent.hasChildren = true;
		} else {
			tree.push(map.get(item.id)!);
		}
	});

	const annotateChildren = (nodes: IMenuItem[]) => {
		nodes.forEach((node) => {
			node.hasChildren = !!node.children?.length;
			node.shouldAutoExpand = false;
			if (node.children?.length) {
				annotateChildren(node.children);
			}
		});
	};

	annotateChildren(tree);

	return tree;
};
