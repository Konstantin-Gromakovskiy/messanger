import { useFormik } from 'formik';
import axios from 'axios';
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
          <div className="card shadow-sm">
            <div className="card-body row p-5">
              <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
                <img alt="Войти" className="rounded-circle" src={loginAvatar} />
              </div>
              <form onSubmit={formik.handleSubmit} className="col-12 col-md-6 mt-3 mt-md-0s">
                <h1 className="text-center mb-4">Войти</h1>
                <div className="form-floating mb-3">
                  <input
                    name="username"
                    autoComplete="username"
                    required
                    placeholder="Ваш ник"
                    id="username"
                    className="form-control"
                    value={formik.values.username}
                    onChange={formik.handleChange}
                  />
                  <label htmlFor="username">Ваш ник</label>
                </div>
                <div className="form-floating mb-4">
                  <input
                    className="form-control"
                    name="password"
                    id="password"
                    type="password"
                    placeholder="Пароль"
                    required
                    autoComplete="current-password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                  />
                  <label className="form-label" htmlFor="password">Пароль</label>
                </div>
                <button className="btn btn-outline-primary w-100 mb-3" type="submit">Войти</button>
              </form>
            </div>
            <div className="card-footer p-4">
              <div className="text-center">
                <span>Нет аккаунта? </span>
                <a href="/register">Регистрация</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
