import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../utils/axios';  // Importando o Axios configurado

function DevicesPage() {
  const [devices, setDevices] = useState([]);
  const navigate = useNavigate();

  // Função para buscar dispositivos da API
  const fetchDevices = async () => {
    const token = localStorage.getItem('authToken');  // Pegando o token do localStorage

    if (!token) {
      alert('Você precisa estar autenticado para acessar os dispositivos');
      navigate('/login');
      return;
    }

    try {
      const response = await api.get('/devices', {
        headers: {
          Authorization: `Bearer ${token}`,  // Passando o token para o header Authorization
        },
      });

      setDevices(response.data);  // Atualizando o estado com os dispositivos recebidos
    } catch (error) {
      alert('Erro ao buscar dispositivos');
      console.error(error);  // Exibindo o erro no console para depuração
    }
  };

 useEffect(() => {
  fetchDevices();
}, [fetchDevices]); // Adiciona 'fetchDevices' como dependência


  return (
    <div>
      <h2>Dispositivos</h2>
      {devices.length > 0 ? (
        <ul>
          {devices.map((device) => (
            <li key={device._id}>
              <h3>{device.name}</h3>
              <p>{device.type}</p>
              <p>Status: {device.status}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>Não há dispositivos registrados.</p>
      )}
    </div>
  );
}

export default DevicesPage;
