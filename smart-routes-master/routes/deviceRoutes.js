// Arquivo: deviceRoutes.js

const express = require('express');
const router = express.Router();
const {
    createDevice,
    addDeviceData,
    getDevices,
    getDevice,
    updateDevice,
    deleteDevice,
} = require('../controllers/deviceController');

console.log({
    createDevice,
    addDeviceData,
    getDevices,
    getDevice,
    updateDevice,
    deleteDevice,
});

// Rotas
router.post('/create', createDevice); // Criar um novo dispositivo
router.post('/add-data', addDeviceData); // Adicionar dados a um dispositivo
router.get('/', getDevices); // Obter todos os dispositivos
router.get('/:id', getDevice); // Obter um dispositivo específico
router.put('/:id', updateDevice); // Atualizar um dispositivo
router.delete('/:id', deleteDevice); // Excluir um dispositivo

module.exports = router;
