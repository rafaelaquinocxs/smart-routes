import React from 'react';
import { List, ListItem, ListItemText, Drawer, Toolbar } from '@mui/material';
import { Link } from 'react-router-dom';

const Sidebar = () => {
    return (
        <Drawer
            variant="permanent"
            sx={{
                width: 240,
                flexShrink: 0,
                [`& .MuiDrawer-paper`]: { width: 240, boxSizing: 'border-box' },
            }}
        >
            <Toolbar />
            <List>
                <ListItem button component={Link} to="/home">
                    <ListItemText primary="Home" />
                </ListItem>
                <ListItem button component={Link} to="/dashboard">
                    <ListItemText primary="Dashboard" />
                </ListItem>
                <ListItem button component={Link} to="/mapa">
                    <ListItemText primary="Mapa" />
                </ListItem>
                <ListItem button component={Link} to="/rotas">
                    <ListItemText primary="Rotas" />
                </ListItem>
            </List>
        </Drawer>
    );
};

export default Sidebar;
