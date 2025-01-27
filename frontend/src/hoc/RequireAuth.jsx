import { useLocation, Navigate } from 'react-router';

const RequireAuth = ({ children }) => {
  const location = useLocation();
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/login" state={{ from: location }} />;
};

export default RequireAuth;
