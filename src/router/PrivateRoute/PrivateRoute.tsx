import { Navigate, Outlet } from 'react-router-dom';
// import { useAuthContext } from '@contexts/AuthContext';

const PrivateRoute = () => {
    // const auth = useAuthContext();
    // if (auth.isLoggedIn) {
    if (true) {
        return <Outlet />;
    } else {
        return <Navigate to="/login" />;
    }
};

export default PrivateRoute;
