const User = require('../models/User');
const Device = require('../models/Device');

// Função para obter os usuários
const getUsers = async (req, res) => {
  try {
    const users = await User.find();  // Supondo que você tenha um modelo de usuário
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Função para obter os dispositivos
const getDevices = async (req, res) => {
  try {
    const devices = await Device.find();  // Supondo que você tenha um modelo de dispositivo
    res.json(devices);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getUsers, getDevices };
