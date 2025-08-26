const express = require("express");
const Admin = require("../models/Admin");
const router = express.Router();

// Crear admin
router.post("/", async (req, res) => {
    try {
        const admin = new Admin(req.body);
        await admin.save();
        res.status(201).json(admin);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Listar admins
router.get("/", async (req, res) => {
    try {
        const admins = await Admin.find();
        res.json(admins);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Obtener un admin por ID
router.get("/:id", async (req, res) => {
  try {
    const admin = await Admin.findById(req.params.id);
    if (!admin) return res.status(404).json({ error: "Admin no encontrado" });
    res.json(admin);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Actualizar admin por ID
router.patch("/:id", async (req, res) => {
  try {
    const admin = await Admin.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true, runValidators: true  });
    if (!admin) return res.status(404).json({ error: "Admin no encontrado" });
    res.json(admin);
    } catch (err) {
    res.status(400).json({ error: err.message });
    }
});

// Eliminar un admin
router.delete("/:id", async (req, res) => {
  try {
    const admin = await Admin.findByIdAndDelete(req.params.id);
    if (!admin) return res.status(404).json({ error: "Admin no encontrado" });
    res.json({ message: "Admin eliminado correctamente" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
