import { Route, Routes } from 'react-router';
import Layout from './components/Layout.jsx';
import NotFoundPage from './components/NotFoundPage.jsx';
import LoginPage from './components/LoginPage.jsx';

const App = () => (
  <Routes>
    <Route element={<Layout />}>
      <Route path="login" element={<LoginPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Route>
  </Routes>

);

export default App;
