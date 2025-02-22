import { createRoot } from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import init from './init.jsx';

const runApp = async () => {
  const vdom = await init();
  createRoot(document.getElementById('root')).render(vdom);
};

runApp();
