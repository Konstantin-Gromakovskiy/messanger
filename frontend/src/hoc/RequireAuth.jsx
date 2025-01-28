import { useLocation, Navigate } from 'react-router';

const RequireAuth = ({ children }) => {
  const location = useLocation();
  const storedUser = localStorage.getItem('user');
  const token = JSON.parse(storedUser)?.token;

  return token ? children : <Navigate to="/login" state={{ from: location }} />;
};

export default RequireAuth;
