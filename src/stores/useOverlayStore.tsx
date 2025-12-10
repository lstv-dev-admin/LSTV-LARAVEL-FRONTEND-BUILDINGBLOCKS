import { create } from "zustand";

interface OverlayState {
	isVisible: boolean;
	message: string;
	show: (message?: string) => void;
	hide: () => void;
}

const defaultMessage = "Processing request...";

const useOverlayStore = create<OverlayState>((set) => ({
	isVisible: false,
	message: defaultMessage,
	show: (message) =>
		set({
			isVisible: true,
			message: message ?? defaultMessage,
		}),
	hide: () =>
		set({
			isVisible: false,
			message: defaultMessage,
		}),
}));

export default useOverlayStore;