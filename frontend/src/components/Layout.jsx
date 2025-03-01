import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import useAuth from '../hook/useAuth.js';

const Layout = ({ children }) => {
  const { logOut, username } = useAuth();
  const { t } = useTranslation();

  return (
    <div className="d-flex flex-column h-100">
      <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
        <div className="container">
          <Link className="navbar-brand" to="/">Hexlet Chat</Link>
          {username && <Button onClick={logOut} as={Link} to="/login" variant="primary">{t('buttons.exit')}</Button>}
        </div>
      </nav>
      {children}
    </div>
  );
};
export default Layout;
