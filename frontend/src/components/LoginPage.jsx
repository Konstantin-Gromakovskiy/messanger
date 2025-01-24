import { useFormik } from 'formik';
import axios from 'axios';
import {
  Card, Form, FloatingLabel, Button,
} from 'react-bootstrap';
import loginAvatar from '../assets/login-avatar.jpg';

const LoginPage = () => {
  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    onSubmit: async (values) => {
      const response = await axios.post('api/v1/login', { ...values });
      const { token } = response.data;
      console.log(token);
    },
  });
  return (
    <div className="container-fluid h-100">
      <div className="row h-100 justify-content-center align-items-center">
        <div className="col-12 col-md-8 col-xxl-6">
          <Card className="shadow-sm">
            <Card.Body className="row p-5">
              <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
                <img src={loginAvatar} className="rounded-circle" />
              </div>
              <Form className="col-12 col-md-6 mt-3 mt-md-0">
                <h1 className="text-center mb-4">Войти</h1>
                <FloatingLabel className="mb-3" label="Ваш ник">
                  <Form.Control
                    required
                    className="form-control"
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
                    className="form-control"
                    autoComplete="current-password"
                    type="password"
                    name="password"
                    placeholder="Пароль"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                  />
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
