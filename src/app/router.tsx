import { BrowserRouter, Routes } from "react-router-dom";
import AppRoutes from "./routes";

export const Router = () => {
    return (
        <BrowserRouter future={{ v7_relativeSplatPath: true, v7_startTransition: true, }}>
            <Routes> {AppRoutes()} </Routes>
        </BrowserRouter>
    );
};