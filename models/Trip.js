const mongoose = require('mongoose');

const ViagemSchema = new mongoose.Schema({
  containers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Container', required: true }],
  horario_saida: { type: Date, required: true },
  horario_retorno: { type: Date, default: null },
  ponto_saida: { type: mongoose.Schema.Types.ObjectId, ref: 'Point', required: true },
  ponto_retorno: { type: mongoose.Schema.Types.ObjectId, ref: 'Point', required: true }
}, {
  collection: 'viagems' // Força o nome da coleção a ser 'viagems'
});

module.exports = mongoose.model('Trip', ViagemSchema);
