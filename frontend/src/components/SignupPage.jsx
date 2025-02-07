import {
  Card, Form, FloatingLabel, Button,
} from 'react-bootstrap';
import { useEffect, useRef } from 'react';
import signupAvatar from '../assets/signup-avatar.jpg';

const SignupPage = () => {
  const inputNameRef = useRef();

  useEffect(() => {
    inputNameRef.current.focus();
  }, []);

  return (
    <div className="container-fluid h-100">
      <div className="row h-100 justify-content-center align-content-center">
        <div className="col-12 col-md-8 col-xxl-6">
          <Card className="shadow-sm">
            <Card.Body className="d-flex flex-column p-5 flex-md-row justify-content-around align-items-center">
              <div>
                <img src={signupAvatar} alt="Регистрация" className="rounded-circle" />
              </div>
              <Form className="w-50">
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
                    />
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
                    />
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
                    />
                  </FloatingLabel>
                </Form.Group>
                <Button variant="outline-primary" type="submit" className="w-100 mb-3">Зарегестрироваться</Button>
              </Form>
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
