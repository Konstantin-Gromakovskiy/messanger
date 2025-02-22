import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout, login } from '../redux/store/authSlice.js';
import routes from '../routes.js';

const useAuth = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const signOut = () => {
    localStorage.removeItem('user');
    dispatch(logout());
    navigate(routes.loginPagePath());
  };
  const signIn = (user, token) => {
    localStorage.setItem('user', JSON.stringify({ token, username: user.username }));
    dispatch(login({ token, username: user.username }));
  };
  return { signIn, signOut };
};

export default useAuth;
