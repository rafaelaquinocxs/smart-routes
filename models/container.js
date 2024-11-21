const mongoose = require('mongoose');

const ContainerSchema = new mongoose.Schema({
  ponto: { type: mongoose.Schema.Types.ObjectId, ref: 'Point', required: true },
  tipo: { type: String, enum: ['Orgânico', 'Seletivo'], required: true },
  nivel: { type: Number, min: 0, max: 100, required: true }
});

module.exports = mongoose.model('Container', ContainerSchema);
