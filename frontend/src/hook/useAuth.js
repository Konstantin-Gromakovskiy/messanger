import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout as logoutSlice, login as loginSlice } from '../redux/store/authSlice.js';
import routes from '../routes.js';

const useAuth = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const logOut = () => {
    localStorage.removeItem('user');
    dispatch(logoutSlice());
    navigate(routes.loginPagePath());
  };
  const logIn = (username, token) => {
    localStorage.setItem('user', JSON.stringify({ token, username }));
    dispatch(loginSlice({ token, username }));
  };
  return { logIn, logOut };
};

export default useAuth;
