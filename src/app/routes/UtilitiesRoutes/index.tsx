import { lazy } from 'react';
import { Route } from 'react-router-dom';
import AppLayout from '../Layouts/AppLayout';
import ProtectedLayout from '../Layouts/ProtectedLayout';

const UserFiles = lazy(() => import('@/pages/utilities/user-files'));
const UserActivityLog = lazy(() => import('@/pages/utilities/user-activity-log'));
const DateLockPage = lazy(() => import('@/pages/utilities/date-lock'));
const BaselineSecurityPage = lazy(() => import('@/pages/utilities/baseline-security'));
const SystemParameterPage = lazy(() => import('@/pages/utilities/system-parameter'));
const ChangePasswordPage = lazy(() => import('@/pages/auth/change-password'));

const UtilitiesRoutes = () => {
    return (
        <Route element={<ProtectedLayout />}>
            <Route element={<AppLayout />}>
                <Route path='/utilities/user-activity-log' element={<UserActivityLog />} />
                <Route path='/utilities/user-files' element={<UserFiles />} />
                <Route path='/utilities/date-lock' element={<DateLockPage />} />
                <Route path='/utilities/baseline-security' element={<BaselineSecurityPage />} />
                <Route path='/utilities/system-parameter' element={<SystemParameterPage />} />
                <Route path='/utilities/change-password' element={<ChangePasswordPage />} />
            </Route>
        </Route>
    )
}

export default UtilitiesRoutes