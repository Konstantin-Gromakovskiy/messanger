import { useFormik } from 'formik';
import { useState } from 'react';
import {
  Card, Form, FloatingLabel, Button,
} from 'react-bootstrap';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import cn from 'classnames';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import axios from 'axios';
import loginAvatar from '../assets/login-avatar.jpg';
import useAuth from '../hook/useAuth.js';
import routes from '../routes.js';

const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [authFailed, setAuthFailed] = useState(false);
  const fromPage = location.state?.from?.pathname || '/';
  const { t } = useTranslation();
  const { logIn } = useAuth();

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    onSubmit: async (values) => {
      setAuthFailed(false);
      try {
        const response = await axios.post(routes.loginUrl(), values);
        const responseToken = response.data.token;
        const { username } = response.data;
        logIn(username, responseToken);
        navigate(fromPage, { replace: true });
      } catch (error) {
        if (!error.isAxiosError) {
          toast(t('toast.unknownError'), { type: 'error' });
          return;
        }
        if (error.status === 401) {
          setAuthFailed(true);
          return;
        }
        toast(t('toast.networkError'), { type: 'error' });
      }
    },
  });

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
                <h1 className="text-center mb-4">{t('loginPage.title')}</h1>
                <FloatingLabel className="mb-3" label={t('loginPage.username')}>
                  <Form.Control
                    required
                    className={`form-control ${cn({ 'is-invalid': authFailed })}`}
                    autoComplete="username"
                    type="text"
                    name="username"
                    placeholder={t('loginPage.username')}
                    value={formik.values.username}
                    onChange={(e) => {
                      setAuthFailed(false);
                      formik.handleChange(e);
                    }}
                  />
                </FloatingLabel>
                <FloatingLabel className="mb-4" label={t('loginPage.password')}>
                  <Form.Control
                    required
                    className={`form-control ${cn({ 'is-invalid': authFailed })}`}
                    autoComplete="current-password"
                    type="password"
                    name="password"
                    placeholder={t('loginPage.password')}
                    value={formik.values.password}
                    onChange={(e) => {
                      setAuthFailed(false);
                      formik.handleChange(e);
                    }}
                  />
                  {authFailed && <div className="invalid-tooltip">{t('errors.authFailed')}</div>}
                </FloatingLabel>
                <Button
                  type="submit"
                  variant="outline-primary"
                  className="w-100 mb-3"
                  disabled={formik.isSubmitting}
                >
                  {t('buttons.login')}
                </Button>
              </Form>
            </Card.Body>
            <Card.Footer className="text-center py-4">
              <span>{`${t('loginPage.account')} `}</span>
              <Link to="/signup">{t('loginPage.registration')}</Link>
            </Card.Footer>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
