const Admin = require("../models/Admin");

// Crear admin
const createAdmin = async (req, res) => {
    try {
        const admin = new Admin(req.body);
        await admin.save();
        res.status(201).json(admin);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

//Listar admins
const getAdmins = async (req, res) => {
    try {
        const admins = await Admin.find();
        res.json(admins);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

//Obtener un admin por ID
const getAdminById = async (req, res) => {
  try {
    const admin = await Admin.findById(req.params.id);
    if (!admin) return res.status(404).json({ error: "Admin no encontrado" });
    res.json(admin);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

//Actualizar admin por ID
const updateAdminById = async (req, res) => {
  try {
    const admin = await Admin.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true, runValidators: true  });
    if (!admin) return res.status(404).json({ error: "Admin no encontrado" });
    res.json(admin);
    } catch (err) {
    res.status(400).json({ error: err.message });
    }
}

//Eliminar admin por ID
const deleteAdminById = async (req, res) => {
  try {
    const admin = await Admin.findByIdAndDelete(req.params.id);
    if (!admin) return res.status(404).json({ error: "Admin no encontrado" });
    res.json({ message: "Admin eliminado correctamente" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

module.exports = { createAdmin, getAdmins, getAdminById, updateAdminById, deleteAdminById };