import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Sidebar from './components/Sidebar';
import Map from './pages/Map';
import RoutesPage from './pages/Routes';
import { AppBar, Toolbar, Typography, CssBaseline, Box } from '@mui/material';
import CreateRoute from './pages/CreateRoute';

function App() {
    return (
        <Router>
            <CssBaseline />
            <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
                <Toolbar>
                    <Typography variant="h6" noWrap>
                        Smart Routes
                    </Typography>
                </Toolbar>
            </AppBar>
            <Box sx={{ display: 'flex' }}>
                <Sidebar />
                <Box component="main" sx={{ flexGrow: 1, p: 3, mt: 8 }}>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/home" element={<Home />} />
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/mapa" element={<Map />} />
                        <Route path="/rotas" element={<RoutesPage />} />
                        <Route path="/create-route" element={<CreateRoute />} />
                    </Routes>
                </Box>
            </Box>
        </Router>
    );
}

export default App;
