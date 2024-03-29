import '@fontsource/lily-script-one';
import '@fontsource/nunito/variable.css';
import 'normalize.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/globals.scss';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
