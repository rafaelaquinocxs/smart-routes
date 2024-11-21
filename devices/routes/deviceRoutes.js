const express = require('express');
const router = express.Router();
const deviceController = require('../controllers/deviceController');

router.post('/create', deviceController.createDevice);
// Rota para registrar os dados do dispositivo
router.post('/data', deviceController.addDeviceData);


module.exports = router;
