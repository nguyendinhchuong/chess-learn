import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App';
import { initAnalytics } from './lib/analytics';
import './styles/app.css';
import './styles/xiangqi.css';
import './styles/landing.css';

initAnalytics();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
