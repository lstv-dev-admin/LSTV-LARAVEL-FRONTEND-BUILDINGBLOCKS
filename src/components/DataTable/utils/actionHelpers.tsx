import { ReactNode } from "react";

// Features
import { IApiAction } from "@/features/shared/types";

// Components
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Button } from "../../ui/button";

// Utils
import { getLucideIcons } from "@/lib/icons";

// Libs
import { FileText, UploadCloud } from "lucide-react";

interface RenderActionButtonOptions<T> {
	action: IApiAction;
	row?: T;
	renderAction?: (action: IApiAction, row?: T) => ReactNode;
	onAction?: (type: string, row?: T) => void;
}

export function renderActionButton<T extends object>({
	action,
	row,
	renderAction,
	onAction,
}: RenderActionButtonOptions<T>): ReactNode {
	if (renderAction) {
		return renderAction(action, row);
	}

	if (onAction) {
		const Icon = action.icon ? getLucideIcons(action.icon) : null;

        if (action.type === 'import') {

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline">
                            {Icon && <Icon className="w-4 h-4" />}
                            {action.label}
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="space-y-1">
                        <DropdownMenuItem 
                            className="flex gap-2" 
                            onSelect={() => onAction("get-template", row)}
                        >
                            <FileText />
                            Get template
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                            className="flex gap-2"
                            onSelect={() => onAction("import-file", row)}
                        >
                            <UploadCloud />
                            Import file
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        }

        const variant = (action.type === 'add' || action.type === 'create') ? 'default' : 'outline';

		return (
			<Button
				key={action.type}
				variant={variant}
				onClick={() => onAction(action.type, row)}
			>
				{Icon && <Icon className="w-4 h-4" />}
				{action.label}
			</Button>
		);
	}

	return null;
}

interface BuildSideActionButtonsOptions<T> {
	sideActions: IApiAction[];
	row: T;
	renderSideAction?: (action: IApiAction, row: T) => ReactNode;
	onAction?: (type: string, row?: T) => void;
}

export function buildSideActionButtons<T extends object>({
	sideActions,
	row,
	renderSideAction,
	onAction,
}: BuildSideActionButtonsOptions<T>): ReactNode[] {
	if (sideActions.length === 0) return [];

	const buttons: ReactNode[] = [];

	sideActions.forEach((action) => {
		if (renderSideAction) {
			const rendered = renderSideAction(action, row);
			if (rendered) {
				buttons.push(rendered);
			}
		} else if (onAction) {
			const Icon = action.icon ? getLucideIcons(action.icon) : null;
			const variant = action.type === "delete" ? "destructive" : "outline";

			if (!Icon) return;

			buttons.push(
				<Button
					key={action.type}
					size="icon"
					variant={variant}
					onClick={() => onAction(action.type, row)}
				>
					<Icon className="w-4 h-4" />
				</Button>
			);
		}
	});

	return buttons;
}
