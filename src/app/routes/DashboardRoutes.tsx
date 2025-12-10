import { lazy } from 'react';
import { Route } from 'react-router-dom';
import AppLayout from './Layouts/AppLayout';
import ProtectedLayout from './Layouts/ProtectedLayout';

const Dashboard = lazy(() => import('@/pages/Dashboard'));

const DashboardRoutes = () => {
    return (
        <Route element={<ProtectedLayout />}>
            <Route element={<AppLayout />}>
                <Route path='/dashboard' element={<Dashboard />} />
            </Route>
        </Route>
    );
};

export default DashboardRoutes;