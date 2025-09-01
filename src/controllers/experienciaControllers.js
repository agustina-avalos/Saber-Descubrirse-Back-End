const Experiencia = require('../models/Experiencia');

//Crear una nueva experiencia por parte del usuario
const createExperiencia = async (req, res) => {
  try {
    const experiencia = new Experiencia(req.body);
    await experiencia.save();
    res.status(201).json(experiencia);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }};


//Obtener todas las experiencias
const getAllExperiencias = async (req, res) => {
  try {
    const experiencias = await Experiencia.find().sort({ createdAt: -1 });
    res.status(200).json(experiencias);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }};


//Obtener todas las experiencias aprobadas
const getExperienciasAprobadas = async (req, res) => {
  try {
    const experiencias = await Experiencia.find({ aprobado: true }).sort({ createdAt: -1 });
    res.status(200).json(experiencias);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }};

  //Aprobar una experiencia (solo admin)
const approveExperiencia = async (req, res) => {
  try {
    //Comprobar que solo se este intentando modificar el campo aprobado
    const allowedField = "aprobado";
    const updateFields = Object.keys(req.body); // Obtiene los campos que se van a actualizar
    const isValidUpdate = (allowedField == updateFields); // Comprueba si el campo a actualizar es el permitido
    if (!isValidUpdate) return res.status(400).json({ error: 'Solo se permite modificar el campo "aprobado"' });

    const experiencia = await Experiencia.findByIdAndUpdate(
      req.params.id,
      { $set: { aprobado: true } },
      { new: true }
    );
    if (!experiencia) return res.status(404).json({ error: 'Experiencia no encontrada' });
    res.json(experiencia);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Eliminar una experiencia
const deleteExperiencia = async (req, res) => {
  try {
    const experiencia = await Experiencia.findByIdAndDelete(req.params.id);
    if (!experiencia) return res.status(404).json({ error: 'Experiencia no encontrada' });
    res.json({ message: 'Experiencia eliminada' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


module.exports = { createExperiencia, getAllExperiencias, getExperienciasAprobadas, approveExperiencia, deleteExperiencia };