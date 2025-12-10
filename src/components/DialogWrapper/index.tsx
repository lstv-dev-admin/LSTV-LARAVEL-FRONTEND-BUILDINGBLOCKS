import { cn } from "@/lib/utils";
import { ReactNode } from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { DialogContent as ShadcnDialogContent } from "@/components/ui/dialog";

export interface DialogContentWrapperProps extends DialogPrimitive.DialogContentProps {
	children: ReactNode;
	hideCloseButton?: boolean;
	disableOverlayClose?: boolean;
}

type PointerDownOutsideEvent = Parameters<NonNullable<DialogPrimitive.DialogContentProps['onPointerDownOutside']>>[0];
type InteractOutsideEvent = Parameters<NonNullable<DialogPrimitive.DialogContentProps['onInteractOutside']>>[0];
type EscapeKeyDownEvent = KeyboardEvent;

const SONNER_TOAST_SELECTOR = "[data-sonner-toast]";
const DEFAULT_CLASSES = "rounded-md max-[546px]:w-[calc(100%-16px)]";
const HIDE_CLOSE_BUTTON_CLASS = "[&>button:last-child]:hidden";

const isSonnerToastClick = (target: EventTarget | null): boolean => {
	if (!(target instanceof Element)) return false;
	return !!target.closest(SONNER_TOAST_SELECTOR);
};

const createOverlayClickHandler = (
	disableOverlayClose: boolean,
	customHandler?: (e: PointerDownOutsideEvent) => void
) => {
	return (e: PointerDownOutsideEvent) => {
		if (disableOverlayClose) {
			e.preventDefault();
			return;
		}

		if (customHandler) {
			customHandler(e);
			return;
		}

		if (isSonnerToastClick(e.target)) {
			e.preventDefault();
		}
	};
};

const createInteractOutsideHandler = (
	disableOverlayClose: boolean,
	customHandler?: (e: InteractOutsideEvent) => void
) => {
	return (e: InteractOutsideEvent) => {
		if (disableOverlayClose) {
			e.preventDefault();
			return;
		}

		if (customHandler) {
			customHandler(e);
		}
	};
};

const createEscapeKeyHandler = (
	hideCloseButton: boolean,
	customHandler?: (e: EscapeKeyDownEvent) => void
) => {
	return (e: EscapeKeyDownEvent) => {
		if (hideCloseButton) {
			e.preventDefault();
			return;
		}

		if (customHandler) {
			customHandler(e);
		}
	};
};

const buildClassName = (hideCloseButton: boolean, customClassName?: string): string => {
	return cn(
		DEFAULT_CLASSES,
		hideCloseButton && HIDE_CLOSE_BUTTON_CLASS,
		customClassName,
        'scrollbar-minimal',
	);
};

const DialogContentWrapper = ({
	children,
	disableOverlayClose = false,
	hideCloseButton = false,
	onPointerDownOutside,
	onInteractOutside,
	onEscapeKeyDown,
	className,
	...props
}: DialogContentWrapperProps) => {
	const handlePointerDownOutside = createOverlayClickHandler(
		disableOverlayClose,
		onPointerDownOutside
	);

	const handleInteractOutside = createInteractOutsideHandler(
		disableOverlayClose,
		onInteractOutside
	);

	const handleEscapeKeyDown = createEscapeKeyHandler(
		hideCloseButton,
		onEscapeKeyDown
	);

	const dialogClassName = buildClassName(hideCloseButton, className);

	return (
		<ShadcnDialogContent
			{...props}
			className={dialogClassName}
			onPointerDownOutside={handlePointerDownOutside}
			onInteractOutside={handleInteractOutside}
			onEscapeKeyDown={handleEscapeKeyDown}
		>
			{children}
		</ShadcnDialogContent>
	);
};

export default DialogContentWrapper;
