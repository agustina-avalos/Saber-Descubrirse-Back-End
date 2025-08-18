const mongoose = require("mongoose");

const experienciasSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  descripcion: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  aprobado: { type: Boolean, default: false } // aprobación del admin
});

module.exports = mongoose.model("Experiencias", experienciasSchema);
