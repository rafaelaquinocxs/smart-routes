// devices/models/deviceModel.js
const mongoose = require('mongoose');

const DeviceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, required: true },
  status: { type: String, enum: ['active', 'inactive'], default: 'active' },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  sensorData: [{ type: Object }]  // Adicionando sensorData para suportar os dados do sensor
});

// Defina o modelo apenas se não existir um modelo com o mesmo nome
const Device = mongoose.models.Device || mongoose.model('Device', DeviceSchema);

module.exports = Device;
