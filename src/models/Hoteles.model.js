const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const HotelSchema = Schema({
    Nombre:String,
    Direccion:String,
    Descripcion:String,
    idProp: { type: Schema.Types.ObjectId, ref: "Usuarios" }
});

module.exports = mongoose.model("Hoteles", HotelSchema);