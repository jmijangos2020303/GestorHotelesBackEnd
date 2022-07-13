const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ReservacionSchema = Schema({
    FechaInicio : String,
    FechaSalida: String,
    NombreReservacion: String,
    idHabitacion:{type:Schema.Types.ObjectId, ref:"Habitaciones"},
    idHotel: {type: Schema.Types.ObjectId, ref:"Hoteles"},
    idRes:{type: Schema.Types.ObjectId, ref:"Usuarios"}
});

module.exports = mongoose.model("Reservaciones", ReservacionSchema);
