import LoginPage from '@/pages/auth/login';
import { Route } from 'react-router-dom'

const AuthRoutes = () => {
    return (
        <Route path="/login" element={<LoginPage />} />
    );
};

export default AuthRoutes;