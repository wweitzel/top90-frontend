import {BrowserRouter} from 'react-router-dom';
import App from './App';
import './index.css';

import React from 'react';
import {createRoot} from 'react-dom/client';

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
