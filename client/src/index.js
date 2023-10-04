import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';




export const server = 'https://blogging-website-backend.vercel.app/'
// export const server = 'http://localhost:5000' ;

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);


