const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Container = require('../../models/Container'); // Modelo de Container
const Trip = require('../../models/Trip'); // Modelo de viagem
const Point = require('../../models/Points'); // Modelo de ponto
const { Client } = require('@googlemaps/google-maps-services-js');
const client = new Client({});
const googleMapsApiKey = process.env.GOOGLE_MAPS_API_KEY; // Carrega a chave da API do .env


router.post('/generate-route', async (req, res) => {
    try {
        const { ponto_saida, containers, ponto_retorno } = req.body;

        if (!ponto_saida || !containers || !ponto_retorno) {
            return res.status(400).json({ error: 'Todos os campos são obrigatórios.' });
        }

        // Obtenha as localizações dos pontos e containers
        const waypoints = containers.map(containerId => `place_id:${containerId}`); // IDs dos containers como place IDs

        // Chamada à API do Google Maps
        const response = await client.directions({
            params: {
                origin: `place_id:${ponto_saida}`,
                destination: `place_id:${ponto_retorno}`,
                waypoints, // Pontos intermediários
                key: googleMapsApiKey, // Certifique-se de que a variável está carregada corretamente
            },
            timeout: 10000, // Tempo limite de 10 segundos
        });

        res.status(200).json({ route: response.data.routes });
    } catch (err) {
        res.status(500).json({ error: 'Erro ao gerar rota.', details: err.message });
    }
});


// Rota para adicionar múltiplos containers
router.post('/add-multiple-containers', async (req, res) => {
    try {
        const { containers } = req.body; // Recebe um array de containers

        if (!Array.isArray(containers) || containers.length === 0) {
            return res.status(400).json({ error: 'O campo "containers" deve ser um array com pelo menos um container.' });
        }

        const newContainers = await Container.insertMany(containers); // Adiciona múltiplos containers de uma vez
        res.status(201).json({ message: 'Containers adicionados com sucesso!', containers: newContainers });
    } catch (err) {
        res.status(500).json({ error: 'Erro ao adicionar múltiplos containers.', details: err.message });
    }
});


// Rota para listar containers com localizações (dados populados)
router.get('/mapa-containers', async (req, res) => {
    try {
        const { tipo } = req.query; // Captura o filtro de tipo, se enviado

        const filters = {}; // Filtro inicial vazio
        if (tipo) {
            filters.tipo = tipo; // Adiciona filtro por tipo de container
        }

        const containers = await Container.find(filters).populate('ponto'); // Popula os dados do ponto
        const formattedContainers = containers.map(container => ({
            id: container._id,
            tipo: container.tipo,
            nivel: container.nivel,
            localizacao: {
                X: container.ponto.localizacao_X,
                Y: container.ponto.localizacao_Y
            }
        }));

        res.status(200).json(formattedContainers); // Retorna os containers formatados
    } catch (err) {
        res.status(500).json({ error: 'Erro ao buscar containers para o mapa.', details: err.message });
    }
});


// Rota para listar containers com filtros opcionais
router.get('/containers', async (req, res) => {
    try {
        const { tipo, nivelMin } = req.query; // Captura os parâmetros opcionais

        const filters = {}; // Filtro inicial vazio
        if (tipo) {
            filters.tipo = tipo; // Filtro por tipo de container
        }
        if (nivelMin) {
            filters.nivel = { $gte: parseInt(nivelMin) }; // Filtro por nível mínimo
        }

        const containers = await Container.find(filters); // Busca os containers filtrados
        res.status(200).json(containers); // Retorna os containers encontrados
    } catch (err) {
        res.status(500).json({ error: 'Erro ao buscar containers.', details: err.message });
    }
});


router.get('/historico-coletas', async (req, res) => {
    try {
        const { tipo, dataInicio, dataFim } = req.query;

        const filters = {};
        if (tipo) {
            filters['containers.tipo'] = tipo;
        }
        if (dataInicio || dataFim) {
            filters.horario_saida = {};
            if (dataInicio) filters.horario_saida.$gte = new Date(dataInicio);
            if (dataFim) filters.horario_saida.$lte = new Date(dataFim);
        }

        const trips = await Trip.find(filters)
            .populate('containers')
            .populate('ponto_saida')
            .populate('ponto_retorno')
            .sort({ horario_saida: -1 });

        res.status(200).json(trips);
    } catch (err) {
        res.status(500).json({ error: 'Erro ao buscar histórico de coletas.', details: err.message });
    }
});

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

router.post('/add-viagem', async (req, res) => {
    try {
        const { containers, ponto_saida, ponto_retorno, horario_saida } = req.body;

        // Validação básica
        if (!containers || !ponto_saida || !ponto_retorno || !horario_saida) {
            return res.status(400).json({ error: 'Todos os campos são obrigatórios.' });
        }

        // Valida se os containers existem
        const validContainers = await Container.find({ _id: { $in: containers } });
        if (validContainers.length !== containers.length) {
            return res.status(400).json({ error: 'Um ou mais containers não são válidos.' });
        }

        // Valida se os pontos de saída e retorno existem
        const validPontoSaida = await Point.findById(ponto_saida);
        const validPontoRetorno = await Point.findById(ponto_retorno);

        if (!validPontoSaida || !validPontoRetorno) {
            return res.status(400).json({ error: 'Ponto de saída ou retorno inválido.' });
        }

        // Cria a viagem
        const newTrip = new Trip({
            containers,
            horario_saida,
            horario_retorno: null,
            ponto_saida,
            ponto_retorno
        });

        await newTrip.save();

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
