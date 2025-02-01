import { Outlet } from 'react-router';
import ModalWindow from './ModalWindow.jsx';

const Layout = () => (
  <div className="d-flex flex-column h-100">
    <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
      <div className="container">
        <a className="navbar-brand" href="/">Hexlet Chat</a>
      </div>
    </nav>
    <Outlet />
    <ModalWindow />
  </div>
);

export default Layout;
