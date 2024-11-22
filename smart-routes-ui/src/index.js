import React from 'react';
import ReactDOM from 'react-dom';
import App from './App'; // Importa o componente principal App

ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    document.getElementById('root') // Certifique-se de que o 'root' existe no public/index.html
);
