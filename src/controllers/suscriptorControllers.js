const Suscriptor = require('../models/Suscriptor');

// Crear un nuevo suscriptor
const createSuscriptor = async (req, res) => {
    try {
        const suscriptor = new Suscriptor(req.body);
        await suscriptor.save();
        res.status(201).json(suscriptor);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

//Obtener todos los suscriptores activos
const getAllSuscriptores = async (req, res) => {
    try {
        const suscriptores = await Suscriptor.find({ active: true });
        res.status(200).json(suscriptores);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

//Eliminar suscriptor
const deleteSuscriptor = async (req, res) => {
    try {
        const suscriptor = await Suscriptor.findByIdAndUpdate(req.params.id, { $set: { active: false } }, { new: true });
        if (!suscriptor) return res.status(404).json({ error: "Suscriptor no encontrado" });
        res.json({ message: "Suscriptor desactivado correctamente" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { createSuscriptor, getAllSuscriptores, deleteSuscriptor };