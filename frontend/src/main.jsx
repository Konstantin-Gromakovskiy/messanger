import { createRoot } from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import init from './init.jsx';

const vdom = await init();
createRoot(document.getElementById('root')).render(vdom);
