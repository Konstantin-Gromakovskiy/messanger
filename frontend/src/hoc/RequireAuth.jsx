import { useLocation, Navigate } from 'react-router';
import routes from '../routes.js';

const RequireAuth = ({ children }) => {
  const location = useLocation();
  const storedUser = localStorage.getItem('user');
  const token = JSON.parse(storedUser)?.token;

  return token ? children : <Navigate to={routes.loginPagePath()} state={{ from: location }} />;
};

export default RequireAuth;
