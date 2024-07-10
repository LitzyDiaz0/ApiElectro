const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const HardwareSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  precio: { type: Number, required: true }, 
  marca: { type: String, required: true }, 
  modelo: { type: String, required: true }, 
  proveedor: { type: String, required: true }
});

module.exports = mongoose.model('Hardware', HardwareSchema);
