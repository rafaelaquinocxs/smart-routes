import React, { useEffect, useState } from 'react';
import { Pie, Bar } from 'react-chartjs-2';
import axios from 'axios';
import {
    Container,
    Grid,
    Card,
    CardContent,
    Typography,

} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import {
    Chart as ChartJS,
    ArcElement,
    BarElement,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale,
} from 'chart.js';

ChartJS.register(ArcElement, BarElement, Tooltip, Legend, CategoryScale, LinearScale);

const Dashboard = () => {
    const [containers, setContainers] = useState([]);
    const [trips, setTrips] = useState([]);

    useEffect(() => {
        // Fetch containers
        axios.get('/api/containers')
            .then(response => setContainers(response.data))
            .catch(error => console.error('Erro ao buscar containers:', error));

        // Fetch trips
        axios.get('/api/viagens')
            .then(response => setTrips(response.data))
            .catch(error => console.error('Erro ao buscar viagens:', error));
    }, []);

    // Dados para os gráficos
    const proportionData = {
        labels: ['Orgânico', 'Seletivo'],
        datasets: [
            {
                label: 'Proporção de Containers',
                data: [
                    containers.filter(c => c.tipo === 'Orgânico').length,
                    containers.filter(c => c.tipo === 'Seletivo').length,
                ],
                backgroundColor: ['#4caf50', '#ff9800'],
            },
        ],
    };

    const levelData = {
        labels: containers.map(c => `${c.tipo} - ${c._id}`),
        datasets: [
            {
                label: 'Nível de Preenchimento (%)',
                data: containers.map(c => c.nivel),
                backgroundColor: '#3f51b5',
            },
        ],
    };

    // Colunas para a tabela de containers
    const containerColumns = [
        { field: '_id', headerName: 'ID', width: 200 },
        { field: 'tipo', headerName: 'Tipo', width: 150 },
        { field: 'nivel', headerName: 'Nível (%)', width: 150 },
    ];

    // Colunas para a tabela de viagens
    const tripColumns = [
        { field: '_id', headerName: 'ID', width: 200 },
        { field: 'horario_saida', headerName: 'Horário Saída', width: 200 },
        { field: 'horario_retorno', headerName: 'Horário Retorno', width: 200 },
    ];

    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Typography variant="h4" sx={{ mb: 4 }}>
                Dashboard
            </Typography>
            <Grid container spacing={4}>
                <Grid item xs={12} md={6}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6" gutterBottom>
                                Proporção de Containers
                            </Typography>
                            <Pie data={proportionData} />
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6" gutterBottom>
                                Níveis de Preenchimento
                            </Typography>
                            <Bar data={levelData} />
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6" gutterBottom>
                                Containers
                            </Typography>
                            <DataGrid
                                rows={containers}
                                columns={containerColumns}
                                getRowId={(row) => row._id}
                                autoHeight
                                disableSelectionOnClick
                            />
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6" gutterBottom>
                                Viagens
                            </Typography>
                            <DataGrid
                                rows={trips}
                                columns={tripColumns}
                                getRowId={(row) => row._id}
                                autoHeight
                                disableSelectionOnClick
                            />
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Container>
    );
};

export default Dashboard;
