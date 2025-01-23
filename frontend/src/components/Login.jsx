import { useState } from 'react';

const Login = () => {
  const [username, setUsername] = useState('');

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  return (
    <div className="container-fluid h-100">
      <div className="row h-100 justify-content-center align-items-center">
        <div className="col-12 col-md-8 col-xxl-6">
          <div className="card shadow-sm">
            <div className="card-body row p-5">
              <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
                <img alt="Войти" className="rounded-circle" src="../../assets/login-avatar.jpg" />
              </div>
              <form className="col-12 col-md-6 mt-3 mt-md-0s">
                <h1 className="text-center mb-4">Войти</h1>
                <div className="form-floating mb-3">
                  <input
                    name="username"
                    autoComplete="username"
                    required
                    placeholder="Ваш ник"
                    id="username"
                    className="form-control"
                    value={username}
                    onChange={handleUsernameChange}
                  />
                  <label htmlFor="username">Ваш ник</label>
                </div>
                <div className="form-floating mb-4">
                  {/* <input className="form-control" /> */}
                </div>
              </form>
            </div>
            <div className="card-footer p-4" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
