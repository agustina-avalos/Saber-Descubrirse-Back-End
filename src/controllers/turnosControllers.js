const Turno = require('../models/Turno');
const Admin = require('../models/Admin');

//Crear turno
const createTurno = async (req, res) => {
    try {
        const admin = await Admin.findById(req.body.adminId);
        if(!admin) return res.status(404).json({ error: 'Admin no encontrado' });

        const turno = new Turno(req.body);
        await turno.save();
        res.status(201).json(turno);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

//Obtener todos los turnos agregando también los datos del Admin asociado
const getAllTurnos = async (req, res) => {
    try {
        const turnos = await Turno.find().populate("adminId", "nombre email"); // Popula el campo adminId con nombre y email del Admin
        res.json(turnos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
//Obtener un turno por ID
const getTurnoById = async (req, res) => {
  try {
    const turno = await Turno.findById(req.params.id).populate("adminId", "nombre email");
    if (!turno) return res.status(404).json({ error: "Turno no encontrado" });
    res.json(turno);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

//Actualizar turno
const updateTurno = async (req, res) => {
  try {
    const turno = await Turno.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true }
    );
    if (!turno) return res.status(404).json({ error: "Turno no encontrado" });
    res.json(turno);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

//Eliminar turno
const deleteTurno = async (req, res) => {
  try {
    const turno = await Turno.findByIdAndDelete(req.params.id);
    if (!turno) return res.status(404).json({ error: "Turno no encontrado" });
    res.json({ message: "Turno eliminado correctamente" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}


module.exports = { createTurno, getAllTurnos, getTurnoById, updateTurno, deleteTurno};