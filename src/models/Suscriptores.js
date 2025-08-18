const mongoose = require("mongoose");

const suscriptoresSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  email: { type: String, required: true, unique: true },
});

module.exports = mongoose.model("Suscriptores", suscriptoresSchema);
