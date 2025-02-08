import { Route, Routes } from 'react-router';
import RequireAuth from './hoc/RequireAuth.jsx';
import Layout from './components/Layout.jsx';
import NotFoundPage from './components/NotFoundPage.jsx';
import LoginPage from './components/LoginPage.jsx';
import MainPage from './components/MainPage.jsx';
import SignupPage from './components/SignupPage.jsx';
import './locale/i18next.js';

const App = () => (
  <Routes>
    <Route element={<Layout />}>
      <Route path="login" element={<LoginPage />} />
      <Route
        path="/"
        element={(
          <RequireAuth>
            <MainPage />
          </RequireAuth>
        )}
      />
      <Route path="signup" element={<SignupPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Route>
  </Routes>

);

export default App;
