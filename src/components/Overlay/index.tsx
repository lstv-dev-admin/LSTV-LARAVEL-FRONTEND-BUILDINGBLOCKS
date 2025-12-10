import { Loader2 } from "lucide-react";
import useOverlayStore from "@/stores/useOverlayStore";

const Overlay = () => {
	const { isVisible, message } = useOverlayStore();

	if (!isVisible) {
		return null;
	}

	return (
		<div className="fixed inset-0 z-[70] flex items-center justify-center bg-slate-900/60 backdrop-blur-sm">
			<div className="flex flex-col items-center gap-3 rounded-lg bg-white/95 px-6 py-4 shadow-lg">
				<Loader2 className="h-6 w-6 animate-spin text-primary" />
				<p className="text-sm font-medium text-slate-700">{message}</p>
			</div>
		</div>
	);
};

export default Overlay;