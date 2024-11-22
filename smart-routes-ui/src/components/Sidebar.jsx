import React from 'react';

const Sidebar = () => {
    return (
        <div style={{
            width: '200px',
            height: '100vh',
            backgroundColor: '#f4f4f4',
            padding: '20px',
            boxShadow: '2px 0 5px rgba(0,0,0,0.1)'
        }}>
            <h3>Sidebar</h3>
            <ul>
                <li><a href="/home">Home</a></li>
                <li><a href="/containers">Containers</a></li>
                <li><a href="/viagens">Viagens</a></li>
            </ul>
        </div>
    );
};

export default Sidebar;
