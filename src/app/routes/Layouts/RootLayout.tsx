import { useEffect } from "react";

// Features
import SuspenseLayout from "./SuspenseLayout";
import { useGetMeQuery } from "@/features/auth/hooks/queries/useGetMeQuery";
import useGetMenu from "@/features/shared/hooks/queries/useGetMenu";

// Components
import PageLoader from "@/components/PageLoader";
import ConfirmDialog from "@/components/ConfirmDialog";
import Overlay from "@/components/Overlay";

// Libs
import { Outlet } from "react-router-dom";

// Utils
import { useAuthStore } from "@/stores/useAuthStore";
import { NavigationProvider } from "@/providers/NavigationProvider";

const RootLayout = () => {
    const { data, isLoading: isAuthLoading, isFetching: isAuthFetching, isError: isAuthError } = useGetMeQuery();
    const { isLoading: isMenuLoading, isFetching: isMenuFetching, isError: isMenuError } = useGetMenu({ 
        enabled: !!data && !isAuthError 
    });
    const { setUser, setAccessibleRoutes } = useAuthStore();
    
    useEffect(() => {
        if (data && !isAuthLoading && !isAuthFetching) {
            setUser(data?.user);
            setAccessibleRoutes(data?.accessible_routes || []);
        }
    }, [data, isAuthLoading, isAuthFetching, setAccessibleRoutes, setUser]);

    const isLoading = !isAuthError && !isMenuError && (isAuthLoading || isAuthFetching || isMenuLoading || isMenuFetching);

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