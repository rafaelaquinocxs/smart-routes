import React from 'react';
import { List, ListItem, ListItemText, Divider } from '@mui/material';

const Sidebar = () => {
    return (
        <div style={{ width: '250px', padding: '10px', background: '#f4f4f4' }}>
            <List>
                <ListItem>
                    <ListItemText primary="Filtros" />
                </ListItem>
                <Divider />
                <ListItem button>
                    <ListItemText primary="Orgânico" />
                </ListItem>
                <ListItem button>
                    <ListItemText primary="Seletivo" />
                </ListItem>
            </List>
        </div>
    );
};

export default Sidebar;
