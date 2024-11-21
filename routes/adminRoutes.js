const express = require('express');
const { getUsers, getDevices } = require('../controllers/adminController');
const router = express.Router();

// Rota para obter a lista de usuários
router.get('/users', getUsers);

// Rota para obter a lista de dispositivos
router.get('/devices', getDevices);

module.exports = router; // Certifique-se de exportar a rota corretamente
