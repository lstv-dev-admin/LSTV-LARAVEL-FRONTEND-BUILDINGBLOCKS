import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuthStore } from "@/stores/useAuthStore";
import { useGetMeQuery } from "@/features/auth/hooks/queries/useGetMeQuery";

const ProtectedLayout = () => {
    const location = useLocation();
    const { data, isLoading, isFetching } = useGetMeQuery();
    const { user, accessibleRoutes } = useAuthStore();

    if (isLoading || isFetching) return null;

    const authenticatedUser = user || data?.user;
    if (!authenticatedUser) return <Navigate to="/login" replace />;

    const routes = data?.accessible_routes || accessibleRoutes || [];
    const isSupervisor = authenticatedUser.user_type === "Supervisor";

    if (!isSupervisor && routes.length === 0) return <Navigate to="/not-found" replace />;
    if (!isSupervisor && !routes.includes(location.pathname)) return <Navigate to="/no-access" replace />;

    return <Outlet />;
};


export default ProtectedLayout;