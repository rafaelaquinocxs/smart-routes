const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Container = require('../../models/Container'); // Modelo de Container
const Trip = require('../../models/Trip'); // Modelo de viagem
const Point = require('../../models/Points'); // Modelo de ponto
const { Client } = require('@googlemaps/google-maps-services-js');
const client = new Client({});

// Rota para buscar viagens com ou sem filtro por tipo de coleta
router.get('/viagens', async (req, res) => {
    try {
        const { tipo } = req.query; // Captura o tipo de coleta como parâmetro (opcional)

        const filters = {}; // Filtro inicial vazio
        if (tipo) {
            // Adiciona filtro pelo tipo de coleta (Orgânico ou Seletivo)
            filters['containers.tipo'] = tipo;
        }

        const trips = await Trip.find(filters)
            .populate('containers') // Popula os dados dos containers
            .populate('ponto_saida') // Popula o ponto de saída
            .populate('ponto_retorno') // Popula o ponto de retorno
            .sort({ horario_saida: -1 }); // Ordena pela data mais recente
        console.log(trips);

        res.status(200).json(trips);
    } catch (err) {
        res.status(500).json({ error: 'Erro ao buscar viagens.', details: err.message });
    }
});

// Rota para criar uma viagem com dados populados
router.post('/add-viagem', async (req, res) => {
    try {
        const { containers, ponto_saida, ponto_retorno, horario_saida } = req.body;

        // Validação básica
        if (!containers || !ponto_saida || !ponto_retorno || !horario_saida) {
            return res.status(400).json({ error: 'Todos os campos são obrigatórios.' });
        }

        // Cria o documento da viagem
        const newTrip = new Trip({
            containers,
            horario_saida,
            horario_retorno: null,
            ponto_saida,
            ponto_retorno
        });

        await newTrip.save(); // Salva no banco de dados

        res.status(201).json({ message: 'Viagem criada com sucesso!', trip: newTrip });
    } catch (err) {
        res.status(500).json({ error: 'Erro ao criar viagem.', details: err.message });
    }
});

// Rota para listar containers > 75%
router.get('/containers', async (req, res) => {
    try {
        const { tipo } = req.query;
        const filters = { nivel: { $gt: 75 } }; // Filtro básico para containers acima de 75%

        if (tipo) {
            filters.tipo = tipo; // Adiciona o tipo de container ao filtro, se especificado
        }

        const containers = await Container.find(filters);
        res.status(200).json(containers);
    } catch (err) {
        res.status(500).json({ error: 'Erro ao buscar containers.', details: err.message });
    }
});

// Rota para adicionar containers (somente para testes)
router.post('/add-container', async (req, res) => {
    try {
        const { ponto, tipo, nivel } = req.body;

        // Valida se o ponto é um ObjectId válido
        if (!mongoose.Types.ObjectId.isValid(ponto)) {
            return res.status(400).json({ error: 'O ponto deve ser um ObjectId válido.' });
        }

        const newContainer = new Container({ ponto, tipo, nivel });
        await newContainer.save();
        res.status(201).json(newContainer);
    } catch (err) {
        res.status(500).json({ error: 'Erro ao adicionar container', details: err.message });
    }
});
// Rota para listar tipos de coleta
router.get('/tipos-coleta', (req, res) => {
    const tipos = ['Orgânico', 'Seletivo']; // Tipos de coleta disponíveis
    res.status(200).json(tipos);
});

// Outras rotas existentes
module.exports = router;
