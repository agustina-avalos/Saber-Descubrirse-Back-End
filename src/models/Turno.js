const mongoose = require("mongoose");

const turnoSchema = new mongoose.Schema({
  _id: { type: mongoose.Schema.Types.ObjectId, auto: true }, //id unico
  nombrePaciente: { type: String, required: true },
  apellidoPaciente: { type: String, required: true },
  telefonoPaciente: { type: String, required: true },
  descripcion: { type: String },
  // Relación con Admin
  adminId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Admin",
    required: true,
  },

  estado: {
    type: String,
    enum: ["pendiente", "confirmado", "cancelado"],
    default: "pendiente",
  },
  fechaTurno: { type: Date, required: true },
});

module.exports = mongoose.model("Turno", turnoSchema);

