import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home'; // Página Home
import Sidebar from './components/Sidebar';

function App() {
    return (
        <Router>
            <Routes>
                {/* Rota principal */}
                <Route path="/" element={<Home />} />

                {/* Rota para Home (mesma funcionalidade da principal, opcional) */}
                <Route path="/home" element={<Home />} />

                {/* Rota para Sidebar */}
                <Route path="/sidebar" element={<Sidebar />} />
            </Routes>
        </Router>
    );
}

export default App;
