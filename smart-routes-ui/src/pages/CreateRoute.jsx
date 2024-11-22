import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Button, Checkbox, FormControlLabel, Typography } from '@mui/material';
import mapboxgl from 'mapbox-gl';

// Define o token de acesso do Mapbox
mapboxgl.accessToken = 'pk.eyJ1IjoiYXF1aW5vcmFmYWN4cyIsImEiOiJjbTNzNjNhbXcwOW8zMmlweWNsdmxpaW90In0.oEEjuCp_KbImb2Gu1-d4SA';


const CreateRoute = () => {
    const [containers, setContainers] = useState([]);
    const [selectedContainers, setSelectedContainers] = useState([]);
    const [map, setMap] = useState(null);
    const [route, setRoute] = useState(null);

    useEffect(() => {
        // Inicializa o mapa
        const initMap = new mapboxgl.Map({
            container: 'map',
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [-46.633308, -23.55052], // Coordenadas iniciais (São Paulo)
            zoom: 12,
        });

        setMap(initMap);

        return () => initMap.remove();
    }, []);

    useEffect(() => {
        // Busca os containers do backend
        const fetchContainers = async () => {
            try {
                const response = await axios.get('http://localhost:5001/api/devices/containers'); // Ajustar conforme a rota
                setContainers(response.data);
            } catch (error) {
                console.error('Erro ao buscar containers:', error);
            }
        };

        fetchContainers();
    }, []);

    const toggleContainerSelection = (id) => {
        setSelectedContainers((prev) =>
            prev.includes(id) ? prev.filter((containerId) => containerId !== id) : [...prev, id]
        );
    };

    const generateRoute = async () => {
        try {
            const response = await axios.post('http://localhost:5001/api/devices/generate-route', {
                containers: selectedContainers,
                ponto_saida: 'place_id_saida',
                ponto_retorno: 'place_id_retorno',
            });
            setRoute(response.data);
        } catch (error) {
            console.error('Erro ao gerar rota:', error);
        }
    };

    useEffect(() => {
        if (map && route) {
            // Adiciona a rota ao mapa
            const coordinates = route[0].geometry.coordinates;
            const bounds = coordinates.reduce((b, coord) => b.extend(coord), new mapboxgl.LngLatBounds(coordinates[0], coordinates[0]));

            // Remove rotas anteriores
            map.getSource('route')?.setData({
                type: 'FeatureCollection',
                features: [
                    {
                        type: 'Feature',
                        geometry: route[0].geometry,
                    },
                ],
            });

            map.fitBounds(bounds, { padding: 50 });
        }
    }, [map, route]);

    return (
        <Box>
            <Typography variant="h4" gutterBottom>
                Criar Rota
            </Typography>
            <Box>
                {containers.map((container) => (
                    <FormControlLabel
                        key={container._id}
                        control={
                            <Checkbox
                                checked={selectedContainers.includes(container._id)}
                                onChange={() => toggleContainerSelection(container._id)}
                            />
                        }
                        label={`Container ${container.tipo} - Nível: ${container.nivel}%`}
                    />
                ))}
            </Box>
            <Button variant="contained" color="primary" onClick={generateRoute} sx={{ mt: 2 }}>
                Gerar Rota
            </Button>
            <Box id="map" sx={{ width: '100%', height: '500px', mt: 4 }} />
        </Box>
    );
};

export default CreateRoute;
