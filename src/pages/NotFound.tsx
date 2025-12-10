import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useAuthStore } from "@/stores/useAuthStore";

const NotFound = () => {
    const { accessibleRoutes, isSupervisor } = useAuthStore();

    const redirectTo = isSupervisor ? "/" : accessibleRoutes[0];

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-100">
            <div className="text-center">
                <h1 className="mb-4 text-4xl font-bold">404</h1>
                <p className="mb-4 text-xl text-gray-600">Oops! Page not found</p>
                <Link 
                    to={redirectTo} 
                    className="text-blue-500 underline hover:text-blue-700"
                >
                    Go Back
                </Link>
            </div>
        </div>
    );
};

export default NotFound;
