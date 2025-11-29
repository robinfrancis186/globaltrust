import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import './styles/fade.css';
import './styles/scroll-arrow.css';
import './utils/fade.js';

console.log('App mounting...', import.meta.env.BASE_URL);
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
