import { useLocation, Navigate } from 'react-router';
import { useSelector } from 'react-redux';

const RequireAuth = ({ children }) => {
  const loggedIn = useSelector((state) => state.auth.isAuth);
  // const auth = false;
  const location = useLocation();

  return (
    loggedIn ? (
      children
    ) : (
      <Navigate to="/login" state={{ from: location }} />
    )
  );
};

export default RequireAuth;
