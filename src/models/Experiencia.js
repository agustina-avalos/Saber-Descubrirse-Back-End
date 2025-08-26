const mongoose = require("mongoose");

const experienciaSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  descripcion: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  aprobado: { type: Boolean, default: false } // aprobación del admin
});

module.exports = mongoose.model("Experiencia", experienciaSchema);
