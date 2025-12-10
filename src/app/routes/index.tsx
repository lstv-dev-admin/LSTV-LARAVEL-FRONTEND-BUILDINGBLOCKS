import { Navigate, Route } from "react-router-dom"
import RootLayout from "./Layouts/RootLayout"
import NotFound from "@/pages/NotFound"
import AuthRoutes from "./AuthRoutes";
import DashboardRoutes from "./DashboardRoutes";
import Playground from "@/pages/Playground";
import MasterfileRoutes from "./MasterfileRoutes";
import LoginPage from "@/pages/auth/login";
import UtilitiesRoutes from "./UtilitiesRoutes";

const AppRoutes = () => {
    return (
        <Route element={<RootLayout />}>
            <Route path="*" element={<NotFound />} />
            <Route path="/" element={<Navigate to={'/dashboard'} replace />} />
            <Route path="/playground" element={<Playground />} />
            {AuthRoutes()}
            {DashboardRoutes()}
            {UtilitiesRoutes()}
            {MasterfileRoutes()}
        </Route>
    );
};

export default AppRoutes;