import * as solid from "@fortawesome/free-solid-svg-icons";
import * as regular from "@fortawesome/free-regular-svg-icons";
import * as brands from "@fortawesome/free-brands-svg-icons";
import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";

interface StyleMap {
	[key: string]: typeof solid | typeof regular | typeof brands;
}

const styleMap: StyleMap = {
	fas: solid,
	"fa-solid": solid,
	fa: solid,
	far: regular,
	"fa-regular": regular,
	fab: brands,
	"fa-brands": brands,
};

const DEFAULT_ICON = regular.faCircleDot;
const DEFAULT_ICON_ACTIVE = regular.faCircleDot;

export function mapClassToIcon(dbClass: string | null | undefined, isActive = false): IconDefinition {
	if (!dbClass) return isActive ? DEFAULT_ICON_ACTIVE : DEFAULT_ICON;

	const parts = dbClass.trim().split(/\s+/);
	const style = parts[0];
	const iconClass = parts[1];
	const iconSet = styleMap[style];

	if (!iconSet || !iconClass) return isActive ? DEFAULT_ICON_ACTIVE : DEFAULT_ICON;

	const raw = iconClass.replace(/^fa-/, "");
	const camelCase = raw.replace(/-([a-z])/g, (_, letter) => letter.toUpperCase());
	const iconName = "fa" + camelCase.charAt(0).toUpperCase() + camelCase.slice(1);

	const foundIcon = (iconSet[iconName as keyof typeof iconSet] as IconDefinition);
	return foundIcon || (isActive ? DEFAULT_ICON_ACTIVE : DEFAULT_ICON);
}

export { DEFAULT_ICON_ACTIVE };