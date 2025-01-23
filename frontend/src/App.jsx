import { Route, Routes } from 'react-router';
import Layout from './components/Layout.jsx';
import NotFoundPage from './components/NotFoundPage.jsx';
import Login from './components/Login.jsx';

const App = () => (
  <Routes>
    <Route element={<Layout />}>
      <Route path="login" element={<Login />} />
      <Route path="*" element={<NotFoundPage />} />
    </Route>
  </Routes>

);

export default App;
