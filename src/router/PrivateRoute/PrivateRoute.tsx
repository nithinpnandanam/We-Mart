import { Navigate, Outlet } from 'react-router-dom';
import { useAuthContext } from '@/contexts/AuthContext/AuthContext';

const PrivateRoute = () => {
    const auth = useAuthContext();
    console.log("=====",auth.isLoggedIn)
    if (auth.isLoggedIn) {
        return <Outlet />;
    } else {
        return <Navigate to="/login" />;
    }
};

export default PrivateRoute;
