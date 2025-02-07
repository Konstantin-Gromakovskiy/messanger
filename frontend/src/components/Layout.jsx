import { Outlet } from 'react-router';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';

const Layout = () => {
  const user = localStorage.getItem('user');
  const navigate = useNavigate();

  const logOut = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <div className="d-flex flex-column h-100">
      <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
        <div className="container">
          <Link className="navbar-brand" to="/">Hexlet Chat</Link>
          {user && <Button onClick={logOut} as={Link} to="/login" variant="primary">Выйти</Button>}
        </div>
      </nav>
      <Outlet />
    </div>
  );
};
export default Layout;
