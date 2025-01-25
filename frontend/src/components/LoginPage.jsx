import { useFormik } from 'formik';
import { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Card, Form, FloatingLabel, Button,
} from 'react-bootstrap';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import loginAvatar from '../assets/login-avatar.jpg';
import { logIn } from '../redux/store/authSlice.js';

const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const fromPage = location.state?.from?.pathname || '/';
  const loggedIn = useSelector((state) => state.auth.isAuth);

  const [authFailed, setAuthFailed] = useState(false);
  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    onSubmit: async (values) => {
      setAuthFailed(null);
      try {
        const response = await axios.post('/api/v1/login', { ...values });
        const { token } = response.data;
        localStorage.setItem('token', token);
        dispatch(logIn());
      } catch (error) {
        if (error.isAxiosError && error.response.status === 401) {
          setAuthFailed(true);
          return;
        }
        console.log(error);
      }
    },
  });

  useEffect(() => {
    if (loggedIn) {
      navigate(fromPage, { replace: true });
    }
  }, [loggedIn]);

  const isInvalidClass = authFailed ? 'is-invalid' : '';
  const authErrorElem = authFailed && <div className="invalid-tooltip">Неверные имя пользователя или пароль</div>;

  return (
    <div className="container-fluid h-100">
      <div className="row h-100 justify-content-center align-items-center">
        <div className="col-12 col-md-8 col-xxl-6">
          <Card className="shadow-sm">
            <Card.Body className="row p-5">
              <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
                <img alt="Login avatar" src={loginAvatar} className="rounded-circle" />
              </div>
              <Form onSubmit={formik.handleSubmit} className="col-12 col-md-6 mt-3 mt-md-0">
                <h1 className="text-center mb-4">Войти</h1>
                <FloatingLabel className="mb-3" label="Ваш ник">
                  <Form.Control
                    required
                    className={`form-control ${isInvalidClass}`}
                    autoComplete="username"
                    type="text"
                    name="username"
                    placeholder="Ваш ник"
                    value={formik.values.username}
                    onChange={formik.handleChange}
                  />
                </FloatingLabel>
                <FloatingLabel className="mb-4" label="Пароль">
                  <Form.Control
                    required
                    className={`form-control ${isInvalidClass}`}
                    autoComplete="current-password"
                    type="password"
                    name="password"
                    placeholder="Пароль"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                  />
                  {authErrorElem}
                </FloatingLabel>
                <Button type="submit" variant="outline-primary" className="w-100 mb-3">Войти</Button>
              </Form>
            </Card.Body>
            <Card.Footer className="text-center py-4">
              <span>
                Нет аккаунта?
                {' '}
              </span>
              <a href="/register">Регистрация</a>
            </Card.Footer>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
