import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/app/app';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
    <React.StrictMode>
        <App />
        <div id="modals-root"></div>
    </React.StrictMode>,
    document.getElementById('root')
);

reportWebVitals();