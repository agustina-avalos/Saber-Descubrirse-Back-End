const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
    _id: { type: mongoose.Schema.Types.ObjectId, auto: true }, //id unico
    nombre: { type: String, required: true },
    apellido: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    passwordHash: { type: String, required: true },
    telefono: { type: String, required: true },
    descripcion: { type: String, required: true },
    foto: { type: String, required: true }
});

module.exports = mongoose.model("Admin", adminSchema);