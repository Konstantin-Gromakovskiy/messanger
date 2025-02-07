import {
  Card, Form, FloatingLabel, Button,
} from 'react-bootstrap';
import { useEffect, useRef } from 'react';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import cn from 'classnames';
import signupAvatar from '../assets/signup-avatar.jpg';
import { useCreateUserMutation } from '../redux/store/userApi.js';

const SignupPage = () => {
  const inputNameRef = useRef();
  const [createUser] = useCreateUserMutation();
  const navigate = useNavigate();
  useEffect(() => {
    inputNameRef.current.focus();
  }, []);

  const validationSchema = yup.object({
    username: yup.string().min(3).max(20).required(),
    password: yup.string().min(6).required(),
    confirmPassword: yup.string().oneOf([yup.ref('password'), null], 'Пароли должны совпадать').required(),
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
        await createUser({ username: values.username, password: values.password }).unwrap();
        navigate('/', { replace: true });
      } catch (error) {
        if (error.status === 409) formik.setErrors({ username: 'User exist' });
        console.log(error);
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
                <img src={signupAvatar} alt="Регистрация" className="rounded-circle" />
              </div>
              <Form onSubmit={formik.handleSubmit} className="w-50">
                <h1 className="text-center mb-4">Регистрация</h1>
                <Form.Group className="mb-4">
                  <Form.Label htmlFor="username" column="sm" className="visually-hidden">Имя пользователя</Form.Label>
                  <FloatingLabel label="Имя пользователя">
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
                  <Form.Label htmlFor="password" column="sm" className="visually-hidden">Пароль</Form.Label>
                  <FloatingLabel label="Пароль">
                    <Form.Control
                      required
                      type="password"
                      placeholder="Не менее 6 символов"
                      name="password"
                      autoComplete="new-password"
                      value={formik.values.password}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className={cn({ 'is-invalid': formik.errors.password && formik.touched.password })}
                    />
                    <div className="invalid-tooltip">{formik.errors.password}</div>
                  </FloatingLabel>
                </Form.Group>
                <Form.Group className="mb-4">
                  <Form.Label htmlFor="confirmPassword" column="sm" className="visually-hidden">Подтвердите пароль</Form.Label>
                  <FloatingLabel label="Подтвердите пароль">
                    <Form.Control
                      required
                      type="password"
                      placeholder="пароли должны совпадать"
                      name="confirmPassword"
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
                  Зарегистрироваться
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
