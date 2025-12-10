// Features
import { IMenuItem } from '@features/shared/types';

export const findMenuCodeFromPath = (path: string, menuTree: IMenuItem[]): string | null => {
	for (const menu of menuTree) {
		if (menu.path === path) {
			return menu.code;
		}
		if (menu.children && menu.children.length > 0) {
			const found = findMenuCodeFromPath(path, menu.children);
			if (found) return found;
		}
	}
	return null;
};