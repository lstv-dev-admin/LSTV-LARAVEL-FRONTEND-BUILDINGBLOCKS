import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@/stores/useAuthStore";

export const NavigationProvider = () => {
    const navigate = useNavigate();
    const setNavigate = useAuthStore((state) => state.setNavigate);

    useEffect(() => {
        setNavigate(() => navigate);
    }, [navigate, setNavigate]);

    return null;
};