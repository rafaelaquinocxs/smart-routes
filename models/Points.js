const mongoose = require('mongoose');

const PointSchema = new mongoose.Schema({
  localizacao_X: { type: String, required: true },
  localizacao_Y: { type: String, required: true },
});

module.exports = mongoose.model('Point', PointSchema, 'points');

