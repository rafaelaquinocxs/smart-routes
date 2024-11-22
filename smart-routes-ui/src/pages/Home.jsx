import React, { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
import axios from 'axios';

const Home = () => {
    const [containers, setContainers] = useState([]);

    useEffect(() => {
        // Fetch dados dos containers
        axios.get('/api/containers')
            .then(response => {
                setContainers(response.data);
            })
            .catch(error => {
                console.error('Erro ao buscar containers:', error);
            });
    }, []);

    return (
        <div style={{ display: 'flex' }}>
            <Sidebar />
            <div style={{ marginLeft: '200px', padding: '20px' }}>
                <h1>Bem-vindo à Home!</h1>
                <ul>
                    {containers.map(container => (
                        <li key={container._id}>
                            {container.tipo}: {container.nivel}%
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Home;
