import { Route } from "react-router-dom";
import ProtectedLayout from "../Layouts/ProtectedLayout";
import AppLayout from "../Layouts/AppLayout";
import GeneralSetupRoutes from "./GeneralSetupRoutes";

const MasterfileRoutes = () => {
	return (
		<Route element={<ProtectedLayout />}>
			<Route element={<AppLayout />}>
				{GeneralSetupRoutes()}
			</Route>
		</Route>
	);
};

export default MasterfileRoutes;