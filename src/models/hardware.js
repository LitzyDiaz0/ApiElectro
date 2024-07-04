const mongoose = require('mongoose');
const { Schema } = mongoose;

const HardwareSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true }
});


// Exportamos el modelo basado en el esquema
// El modelo 'Hardware' se asociará con la colección 'hardwares' en la base de datos
module.exports = mongoose.model('Hardware', HardwareSchema);
