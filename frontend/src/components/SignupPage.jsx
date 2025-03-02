import {
  Card, Form, FloatingLabel, Button,
} from 'react-bootstrap';
import { useEffect, useRef } from 'react';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import cn from 'classnames';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import axios from 'axios';
import signupAvatar from '../assets/signup-avatar.jpg';
import routes from '../routes.js';
import useAuth from '../hook/useAuth.js';

const SignupPage = () => {
  const inputNameRef = useRef();
  const navigate = useNavigate();
  const { logIn } = useAuth();
  useEffect(() => {
    inputNameRef.current.focus();
  }, []);
  const { t } = useTranslation();

  const validationSchema = yup.object({
    username: yup.string().min(3, t('errors.min3max20')).max(20, t('errors.min3max20')).required(t('errors.required')),
    password: yup.string().min(6, t('errors.min3max20')).required(t('errors.required')),
    confirmPassword: yup.string().oneOf([yup.ref('password'), null], t('errors.oneOf')).required(t('errors.required')),
  });

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      confirmPassword: '',
    },
    validateOnBlur: false,
    validationSchema,
    onSubmit: async (values) => {
      try {
        const response = await axios.post(
          routes.createUserUrl(),
          { username: values.username, password: values.password },
        );
        const { username, token } = response.data;
        logIn(username, token);
        navigate(routes.mainPagePath(), { replace: true });
      } catch (error) {
        if (!error.isAxiosError) {
          toast(t('toast.unknownError'), { type: 'error' });
          return;
        }
        if (error.status === 409) {
          formik.setErrors({ username: t('errors.userExists') });
          return;
        }
        toast(t('toast.networkError', { type: 'error' }));
      }
    },
  });

  return (
    <div className="container-fluid h-100">
      <div className="row h-100 justify-content-center align-content-center">
        <div className="col-12 col-md-8 col-xxl-6">
          <Card className="shadow-sm">
            <Card.Body className="d-flex flex-column p-5 flex-md-row justify-content-around align-items-center">
              <div>
                <img src={signupAvatar} alt={t('signupPage.title')} className="rounded-circle" />
              </div>
              <Form onSubmit={formik.handleSubmit} className="w-50">
                <h1 className="text-center mb-4">{t('signupPage.title')}</h1>
                <Form.Group className="mb-4">
                  <Form.Label htmlFor="username" column="sm" className="visually-hidden">{t('signupPage.username')}</Form.Label>
                  <FloatingLabel label={t('signupPage.username')}>
                    <Form.Control
                      ref={inputNameRef}
                      required
                      type="text"
                      placeholder="От 3 до 20 символов"
                      name="username"
                      autoComplete="username"
                      value={formik.values.username}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className={cn({ 'is-invalid': formik.errors.username && formik.touched.username })}
                    />
                    <div className="invalid-tooltip">{formik.errors.username}</div>
                  </FloatingLabel>
                </Form.Group>
                <Form.Group className="mb-4">
                  <Form.Label htmlFor="password" column="sm" className="visually-hidden">{t('signupPage.password')}</Form.Label>
                  <FloatingLabel label={t('signupPage.password')}>
                    <Form.Control
                      required
                      type="password"
                      name="password"
                      autoComplete="new-password"
                      placeholder={t('signupPage.password')}
                      value={formik.values.password}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className={cn({ 'is-invalid': formik.errors.password && formik.touched.password })}
                    />
                    <div className="invalid-tooltip">{formik.errors.password}</div>
                  </FloatingLabel>
                </Form.Group>
                <Form.Group className="mb-4">
                  <Form.Label
                    htmlFor="confirmPassword"
                    column="sm"
                    className="visually-hidden"
                  >
                    {t('signupPage.confirmPassword')}
                  </Form.Label>
                  <FloatingLabel label={t('signupPage.confirmPassword')}>
                    <Form.Control
                      required
                      type="password"
                      name="confirmPassword"
                      placeholder={t('signupPage.confirmPassword')}
                      autoComplete="new-password"
                      value={formik.values.confirmPassword}
                      className={cn({ 'is-invalid': formik.errors.confirmPassword && formik.touched.confirmPassword })}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    <div className="invalid-tooltip">{formik.errors.confirmPassword}</div>
                  </FloatingLabel>
                </Form.Group>
                <Button
                  variant="outline-primary"
                  disabled={formik.isSubmitting}
                  type="submit"
                  className="w-100 mb-3"
                >
                  {t('buttons.signup')}
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
