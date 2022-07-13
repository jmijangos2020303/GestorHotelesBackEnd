const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const HabitacionSchema = Schema({
    No_Habit:Number,
    Descripcion:String,
    Disponibilidad:String,
    idHot: { type: Schema.Types.ObjectId, ref: "Hoteles" }
});

module.exports = mongoose.model("Habitaciones", HabitacionSchema);