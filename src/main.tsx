import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import 'primeicons/primeicons.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);