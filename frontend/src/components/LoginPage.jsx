import { useFormik } from 'formik';
import { useState, useEffect } from 'react';
import {
  Card, Form, FloatingLabel, Button,
} from 'react-bootstrap';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import cn from 'classnames';
import loginAvatar from '../assets/login-avatar.jpg';
import { useLoginMutation } from '../redux/store/userApi.js';

const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [login] = useLoginMutation();
  const [authFailed, setAuthFailed] = useState(false);
  const fromPage = location.state?.from?.pathname || '/';
  const storedUser = localStorage.getItem('user');
  const token = JSON.parse(storedUser)?.token;

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    onSubmit: async (values) => {
      setAuthFailed(false);
      try {
        const { username } = values;
        const response = await login(values).unwrap();
        const requestToken = response.token;
        localStorage.setItem('user', JSON.stringify({ token: requestToken, username }));
      } catch (error) {
        if (error.data.error === 'Unauthorized') {
          setAuthFailed(true);
          return;
        }
        console.log(error);
      }
    },
  });

  useEffect(() => {
    if (token) navigate(fromPage, { replace: true });
  }, [token, navigate, fromPage]);

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
                    className={`form-control ${cn({ 'is-invalid': authFailed })}`}
                    autoComplete="username"
                    type="text"
                    name="username"
                    placeholder="Ваш ник"
                    value={formik.values.username}
                    onChange={(e) => {
                      setAuthFailed(false);
                      formik.handleChange(e);
                    }}
                  />
                </FloatingLabel>
                <FloatingLabel className="mb-4" label="Пароль">
                  <Form.Control
                    required
                    className={`form-control ${cn({ 'is-invalid': authFailed })}`}
                    autoComplete="current-password"
                    type="password"
                    name="password"
                    placeholder="Пароль"
                    value={formik.values.password}
                    onChange={(e) => {
                      setAuthFailed(false);
                      formik.handleChange(e);
                    }}
                  />
                  {authFailed && <div className="invalid-tooltip">Неверные имя пользователя или пароль</div>}
                </FloatingLabel>
                <Button
                  type="submit"
                  variant="outline-primary"
                  className="w-100 mb-3"
                >
                  Войти
                </Button>
              </Form>
            </Card.Body>
            <Card.Footer className="text-center py-4">
              <span>{'Нет аккаунта? '}</span>
              <Link to="/signup">Регистрация</Link>
            </Card.Footer>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
