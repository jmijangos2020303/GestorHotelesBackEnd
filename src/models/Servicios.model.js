const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ServicioSchema = Schema({
    nombre: String,
    costo: Number
  
});
module.exports = mongoose.model('Servicios',ServicioSchema);