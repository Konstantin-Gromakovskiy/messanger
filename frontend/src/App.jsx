import { Route, Routes } from 'react-router';
import Layout from './components/Layout.jsx';
import NotFoundPage from './components/NotFoundPage.jsx';

const App = () => (
  <Routes>
    <Route path="/" element={<Layout />}>
      <Route path="*" element={<NotFoundPage />} />
    </Route>
  </Routes>

);

export default App;
