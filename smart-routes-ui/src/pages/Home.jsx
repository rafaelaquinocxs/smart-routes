import React, { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
import axios from 'axios';

const Home = () => {
    const [containers, setContainers] = useState([]);
    const [tipoFiltro, setTipoFiltro] = useState(''); // Estado para o filtro

    const fetchContainers = (tipo = '') => {
        axios
            .get(`/api/containers${tipo ? `?tipo=${tipo}` : ''}`) // Filtro opcional
            .then(response => {
                setContainers(response.data);
            })
            .catch(error => {
                console.error('Erro ao buscar containers:', error);
            });
    };

    useEffect(() => {
        fetchContainers(); // Busca inicial sem filtros
    }, []);

    const handleFiltroChange = (e) => {
        const tipo = e.target.value;
        setTipoFiltro(tipo);
        fetchContainers(tipo); // Atualiza a busca com o filtro
    };

    return (
        <div style={{ display: 'flex' }}>
            <Sidebar />
            <div style={{ marginLeft: '200px', padding: '20px' }}>
                <h1>Bem-vindo à Home!</h1>
                <div>
                    <label htmlFor="filtro-tipo">Filtrar por Tipo:</label>
                    <select
                        id="filtro-tipo"
                        value={tipoFiltro}
                        onChange={handleFiltroChange}
                        style={{ marginLeft: '10px' }}
                    >
                        <option value="">Todos</option>
                        <option value="Orgânico">Orgânico</option>
                        <option value="Seletivo">Seletivo</option>
                    </select>
                </div>
                <ul style={{ marginTop: '20px' }}>
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
