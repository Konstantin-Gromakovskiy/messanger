import { useLocation, Navigate } from 'react-router';
import { useSelector } from 'react-redux';
import routes from '../routes.js';

const RequireAuth = ({ children }) => {
  const location = useLocation();
  const { token } = useSelector((state) => state.auth);

  return token ? children : <Navigate to={routes.loginPagePath()} state={{ from: location }} />;
};

export default RequireAuth;
