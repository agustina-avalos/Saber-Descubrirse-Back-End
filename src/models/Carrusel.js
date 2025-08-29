const mongoose = require("mongoose");

const carruselSchema = new mongoose.Schema({
  imageUrl: { type: String, required: true }, // URL de la imagen
  order: { type: Number, required: true }, // posición en el carrusel
});

module.exports = mongoose.model("Carrusel", carruselSchema);
