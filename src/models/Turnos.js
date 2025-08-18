const mongoose = require("mongoose");

const turnosSchema = new mongoose.Schema({
    _id: { type: mongoose.Schema.Types.ObjectId, auto: true }, //id unico
    profesionalId: { type: mongoose.Schema.Types.ObjectId, required: true },
    nombrePaciente: { type: String, required: true },
    apellidoPaciente: { type: String, required: true },
    telefonoPaciente: { type: String, required: true },
    fechaTurno: { type: Date, required: true },
});

module.exports = mongoose.model("Turnos", turnosSchema);