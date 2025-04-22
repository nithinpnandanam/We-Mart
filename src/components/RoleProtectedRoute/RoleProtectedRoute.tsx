import { FC } from 'react';
import { useAuthContext } from '../../contexts/AuthContext/AuthContext'
import { Navigate, Outlet } from 'react-router-dom';

type RoleProtectedRouteProps = {
  allowedRoles: string[];
};

const RoleProtectedRoute: FC<RoleProtectedRouteProps> = ({ allowedRoles }) => {
  const {role} = useAuthContext();
  console.log(role,allowedRoles)
  if (role && allowedRoles.includes(role)) return <Outlet />;
  return <Navigate to="/error" replace />;
};

export default RoleProtectedRoute;
