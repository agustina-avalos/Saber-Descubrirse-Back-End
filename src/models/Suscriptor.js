const mongoose = require("mongoose");

const suscriptorSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  email: { type: String, required: true, unique: true },
});

module.exports = mongoose.model("Suscriptor", suscriptorSchema);
