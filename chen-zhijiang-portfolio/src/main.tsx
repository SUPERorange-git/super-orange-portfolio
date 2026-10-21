import React from 'react';
import ReactDOM from 'react-dom/client';
import '@fontsource/kanit/latin-300.css';
import '@fontsource/kanit/latin-400.css';
import '@fontsource/kanit/latin-500.css';
import '@fontsource/kanit/latin-600.css';
import '@fontsource/kanit/latin-700.css';
import '@fontsource/kanit/latin-800.css';
import '@fontsource/kanit/latin-900.css';
import App from './App';
import './styles/global.css';
import './styles/creator.css';
import './styles/particles.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode><App /></React.StrictMode>,
);
