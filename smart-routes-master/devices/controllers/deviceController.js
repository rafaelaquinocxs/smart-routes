// Arquivo: deviceController.js

const Device = require('../models/deviceModel');

// Criar um novo dispositivo
exports.createDevice = async (req, res) => {
    const { deviceId, sensorData } = req.body;
    try {
        const device = new Device({ deviceId, sensorData });
        await device.save();
        res.status(201).json({ message: 'Dispositivo criado com sucesso', device });
    } catch (err) {
        res.status(500).json({ error: 'Erro ao criar dispositivo' });
    }
};

// Adicionar dados ao dispositivo existente
exports.addDeviceData = async (req, res) => {
    const { deviceId, sensorData } = req.body;
    try {
        const device = await Device.findOne({ deviceId });
        if (!device) {
            return res.status(404).json({ message: 'Dispositivo não encontrado' });
        }
         if (!device.sensorData) {
            device.sensorData = []; // Se não existir, inicializa como um array vazio
        }
        device.sensorData.push(sensorData);
        await device.save();
        res.status(201).json({ message: 'Dados adicionados com sucesso', device });
    } catch (err) {
        res.status(500).json({ error: 'Erro ao adicionar dados ao dispositivo' });
    }
};

// Obter todos os dispositivos
exports.getDevices = async (req, res) => {
    try {
        const devices = await Device.find();
        res.status(200).json(devices);
    } catch (err) {
        res.status(500).json({ error: 'Erro ao buscar dispositivos' });
    }
};

// Obter um dispositivo específico
exports.getDevice = async (req, res) => {
    const { id } = req.params;
    try {
        const device = await Device.findById(id);
        if (!device) {
            return res.status(404).json({ message: 'Dispositivo não encontrado' });
        }
        res.status(200).json(device);
    } catch (err) {
        res.status(500).json({ error: 'Erro ao buscar o dispositivo' });
    }
};

// Atualizar um dispositivo
exports.updateDevice = async (req, res) => {
    const { id } = req.params;
    const { sensorData } = req.body;
    try {
        const device = await Device.findByIdAndUpdate(id, { sensorData }, { new: true });
        if (!device) {
            return res.status(404).json({ message: 'Dispositivo não encontrado' });
        }
        res.status(200).json({ message: 'Dispositivo atualizado com sucesso', device });
    } catch (err) {
        res.status(500).json({ error: 'Erro ao atualizar o dispositivo' });
    }
};

// Excluir um dispositivo
exports.deleteDevice = async (req, res) => {
    const { id } = req.params;
    try {
        const device = await Device.findByIdAndDelete(id);
        if (!device) {
            return res.status(404).json({ message: 'Dispositivo não encontrado' });
        }
        res.status(200).json({ message: 'Dispositivo excluído com sucesso' });
    } catch (err) {
        res.status(500).json({ error: 'Erro ao excluir o dispositivo' });
    }
};
