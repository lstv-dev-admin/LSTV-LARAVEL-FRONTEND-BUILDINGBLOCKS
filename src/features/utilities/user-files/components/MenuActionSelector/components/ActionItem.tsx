// Libs
import { getLucideIcons } from "@/lib/icons";

// Components
import { Checkbox } from "@/components/ui/checkbox";

interface ActionItemProps {
	action: { id: number; label: string; icon: string; type: string; position: string };
	isSelected: boolean;
	isAdministrator: boolean;
	disabled?: boolean;
	onToggle: (checked: boolean) => void;
}

export const ActionItem = ({ action, isSelected, isAdministrator, disabled = false, onToggle }: ActionItemProps) => {
	const ActionIcon = action.icon ? getLucideIcons(action.icon) : null;

	return (
		<div className="flex items-center gap-2 py-0.5">
			<Checkbox
				checked={isSelected}
				onCheckedChange={(checked) => !isAdministrator && !disabled && onToggle(checked === true)}
				disabled={isAdministrator || disabled}
			/>
			{ActionIcon && (
				<ActionIcon className="h-3 w-3 flex-shrink-0 text-muted-foreground" />
			)}
			<span className="text-xs text-foreground/80 whitespace-nowrap">
				{action.label}
			</span>
		</div>
	);
};

