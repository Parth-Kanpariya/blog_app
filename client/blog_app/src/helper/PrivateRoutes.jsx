import { Outlet, Navigate } from 'react-router-dom';

const PrivateRoute = () => {
  const token = localStorage.token;
  const user = localStorage.userId;

  return token && user ? <Outlet /> : <Navigate to="/login" />;
};
export default PrivateRoute;
