const express = require('express');
const Turno = require('../models/Turno');
const Admin = require('../models/Admin');
const router = express.Router();

// Crear un nuevo turno
router.post('/', async (req, res) => {
    try {
        const admin = await Admin.findById(req.body.adminId);
        if(!admin) return res.status(404).json({ error: 'Admin no encontrado' });

        const turno = new Turno(req.body);
        await turno.save();
        res.status(201).json(turno);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

//Listar turnos de un admin

router.get("/", async (req, res) => {
    try {
        const turnos = await Turno.find().populate("adminId", "nombre email"); // Popula el campo adminId con nombre y email del Admin
        res.json(turnos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Obtener un turno por ID

router.get("/:id", async (req, res) => {
  try {
    const turno = await Turno.findById(req.params.id).populate("adminId", "nombre email");
    if (!turno) return res.status(404).json({ error: "Turno no encontrado" });
    res.json(turno);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
// Editar un turno

router.patch("/:id", async (req, res) => {
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
});

// Eliminar un turno

router.delete("/:id", async (req, res) => {
  try {
    const turno = await Turno.findByIdAndDelete(req.params.id);
    if (!turno) return res.status(404).json({ error: "Turno no encontrado" });
    res.json({ message: "Turno eliminado correctamente" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;