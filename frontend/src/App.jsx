import { ToastContainer } from 'react-toastify';
import { Route, Routes, BrowserRouter } from 'react-router';
import { Provider } from 'react-redux';
import { Provider as RollbarProvider, ErrorBoundary } from '@rollbar/react';
import RequireAuth from './hoc/RequireAuth.jsx';
import Layout from './components/Layout.jsx';
import NotFoundPage from './components/NotFoundPage.jsx';
import LoginPage from './components/LoginPage.jsx';
import MainPage from './components/MainPage.jsx';
import SignupPage from './components/SignupPage.jsx';
import './locale/i18next.js';
import rollbarConfig from '../rollbar.config.js';
import routes from './routes.js';

const App = ({ store }) => (
  <RollbarProvider config={rollbarConfig}>
    <ErrorBoundary>
      <Provider store={store}>
        <ToastContainer hideProgressBar />
        <BrowserRouter>
          <Routes>
            <Route element={<Layout />}>
              <Route path={routes.loginPagePath()} element={<LoginPage />} />
              <Route
                path={routes.mainPagePath()}
                element={(
                  <RequireAuth>
                    <MainPage />
                  </RequireAuth>
                )}
              />
              <Route path={routes.signUpPagePath()} element={<SignupPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </Provider>
    </ErrorBoundary>
  </RollbarProvider>
);
export default App;
