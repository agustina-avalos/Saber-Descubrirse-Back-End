const mongoose = require("mongoose");

const contenidoPaginaSchema = new mongoose.Schema({
  section: {
    type: String,
    required: true,
    enum: ["saber_descubrirse","como_trabajamos", "nuestros_servicios", "contacto"],
  }, // identifica la sección
  title: { type: String, required: true }, // título visible en la página
  content: { type: String, required: true }, // aquí se pueden escribir muchos caracteres
});

module.exports = mongoose.model("ContenidoPagina", contenidoPaginaSchema);
