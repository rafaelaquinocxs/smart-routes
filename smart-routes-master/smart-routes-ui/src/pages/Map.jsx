import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import axios from 'axios';
import { Box } from '@mui/material';

// Define o token de acesso do Mapbox
mapboxgl.accessToken = 'pk.eyJ1IjoiYXF1aW5vcmFmYWN4cyIsImEiOiJjbTNzNjNhbXcwOW8zMmlweWNsdmxpaW90In0.oEEjuCp_KbImb2Gu1-d4SA';


const Map = () => {
    const mapContainerRef = useRef(null);
    const [map, setMap] = useState(null);
    const [containers, setContainers] = useState([]);

    // Inicializa o mapa ao montar o componente
    useEffect(() => {
        const initMap = new mapboxgl.Map({
            container: mapContainerRef.current,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [-46.633308, -23.55052], // Coordenadas iniciais (São Paulo)
            zoom: 12,
        });

        setMap(initMap);

        return () => initMap.remove(); // Remove o mapa ao desmontar o componente
    }, []);

    // Busca os dados dos containers do backend
    useEffect(() => {
        const fetchContainers = async () => {
            try {
                const response = await axios.get('http://localhost:5001/api/devices/containers'); // Ajuste conforme sua rota
                setContainers(response.data);
            } catch (error) {
                console.error('Erro ao buscar containers:', error);
            }
        };

        void fetchContainers();
    }, []);

    // Adiciona marcadores no mapa
    useEffect(() => {
        if (map && containers.length) {
            containers.forEach((container) => {
                const { ponto, tipo, nivel } = container;

                // Verifica se as coordenadas do ponto estão disponíveis
                if (ponto?.localizacao_X && ponto?.localizacao_Y) {
                    // Cria um elemento HTML para o marcador
                    const el = document.createElement('div');
                    el.style.width = '30px';
                    el.style.height = '30px';
                    el.style.backgroundSize = 'cover';

                    // Define o ícone com base no tipo do container
                    if (tipo === 'Orgânico') {
                        el.style.backgroundImage = 'url(/icons/organico.png)'; // Ícone para orgânico
                    } else if (tipo === 'Seletivo') {
                        el.style.backgroundImage = 'url(/icons/seletivo.png)'; // Ícone para seletivo
                    }

                    // Adiciona o marcador ao mapa
                    new mapboxgl.Marker(el)
                        .setLngLat([parseFloat(ponto.localizacao_X), parseFloat(ponto.localizacao_Y)])
                        .setPopup(
                            new mapboxgl.Popup().setHTML(
                                `<strong>${tipo}</strong><br>Nível: ${nivel}%`
                            )
                        ) // Adiciona um popup com informações do container
                        .addTo(map);
                }
            });
        }
    }, [map, containers]);

    return (
        <Box sx={{ height: '100vh' }}>
            <div ref={mapContainerRef} style={{ width: '100%', height: '100%' }} />
        </Box>
    );
};

export default Map;
