import React from 'react';
import { createRoot } from 'react-dom/client'; // Certifique-se de importar corretamente
import App from './App'; // Seu componente principal

const rootElement = document.getElementById('root'); // Certifique-se de ter um elemento com ID "root" no HTML
if (rootElement) {
    const root = createRoot(rootElement);
    root.render(<App />);
}
