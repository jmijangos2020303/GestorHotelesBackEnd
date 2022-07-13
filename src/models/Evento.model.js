const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const EventoSchema = Schema({
    idHot: { type: Schema.Types.ObjectId, ref: 'Hoteles' },
    nombre: String,
    descripcion: String,
    fechaInicio: String,
    fechaFinal: String,
})

module.exports = mongoose.model('Eventos', EventoSchema);