import { useEffect } from "react";

// Features
import SuspenseLayout from "./SuspenseLayout";
import { useGetMeQuery } from "@/features/auth/hooks/queries/useGetMeQuery";
import useGetMenuQuery from "@/features/shared/hooks/queries/useGetMenuQuery";

// Components
import PageLoader from "@/components/PageLoader";
import ConfirmDialog from "@/components/ConfirmDialog";
import Overlay from "@/components/Overlay";

// Libs
import { Outlet } from "react-router-dom";

// Utils
import { useAuthStore } from "@/stores/useAuthStore";
import { NavigationProvider } from "@/providers/NavigationProvider";
import { Button } from "@/components/ui/button";
import { AxiosError } from "axios";

const RootLayout = () => {
    const { data, isLoading: isAuthLoading, isFetching: isAuthFetching, isError: isAuthError, error } = useGetMeQuery();
    const { isLoading: isMenuLoading, isFetching: isMenuFetching, isError: isMenuError } = useGetMenuQuery({ 
        enabled: !!data && !isAuthError 
    });
    const { setUser, setAccessibleRoutes } = useAuthStore();
    
    useEffect(() => {
        if (data && !isAuthLoading && !isAuthFetching) {
            setUser(data?.user);
            setAccessibleRoutes(data?.accessible_routes || []);
        }
    }, [data, isAuthLoading, isAuthFetching, setAccessibleRoutes, setUser]);

    const isLoading = isAuthLoading || isAuthFetching || isMenuLoading || isMenuFetching;
    const authError = error as AxiosError;

    if ((isAuthError || isMenuError) && authError.response?.status !== 401) {
        return (
            <div className="flex min-h-screen flex-col items-center justify-center px-4">
                <p className="text-destructive mb-4 text-center text-sm">
                    Failed to connect to the backend.<br/>
                    Please check your internet connection or ensure the server is running.
                </p>
                <Button onClick={() => window.location.reload()}>
                    Retry
                </Button>
            </div>
        );
    };

    if (isLoading) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
            </div>
        );
    }

	return (
		<SuspenseLayout>
			<ConfirmDialog />
			<Overlay />
			<PageLoader />
			<NavigationProvider />
			<Outlet />
		</SuspenseLayout>
	);
};

export default RootLayout;