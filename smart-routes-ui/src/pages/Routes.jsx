import React from 'react';
import { Container, Typography, Button, Grid, TextField } from '@mui/material';

const Routes = () => {
    const handleGenerateRoute = () => {
        // Lógica para criar rota
        console.log('Gerando rota...');
    };

    return (
        <Container maxWidth="md">
            <Typography variant="h4" sx={{ my: 4 }}>
                Criar Rotas
            </Typography>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        label="Ponto de Saída"
                        placeholder="Digite o ponto de saída"
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        label="Containers"
                        placeholder="Selecione os containers para a rota"
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        label="Ponto de Retorno"
                        placeholder="Digite o ponto de retorno"
                    />
                </Grid>
                <Grid item xs={12}>
                    <Button variant="contained" color="primary" onClick={handleGenerateRoute}>
                        Gerar Rota
                    </Button>
                </Grid>
            </Grid>
        </Container>
    );
};

export default Routes;
