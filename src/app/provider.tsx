import { QueryClientProvider } from "@tanstack/react-query";
import { HelmetProvider } from "react-helmet-async";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { queryClient } from "@/config/reactQueryClient";

interface AppProviderProps {
	children: React.ReactNode;
}

export const AppProvider = ({ children }: AppProviderProps) => {
	return (
		<QueryClientProvider client={queryClient}>
			<HelmetProvider>
				<TooltipProvider>
					{children}
					<Sonner 
						className="pointer-events-auto"
						position="top-center"
						richColors
						expand
						theme="light"
						swipeDirections={["right", "left", "top", "bottom"]}
						toastOptions={{
							duration: 1500,
						}}
					/>
				</TooltipProvider>
			</HelmetProvider>
		</QueryClientProvider>
	);
};

