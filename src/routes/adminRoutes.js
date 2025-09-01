const express = require("express");
const router = express.Router();
const { createAdmin, getAdmins, getAdminById, updateAdminById, deleteAdminById } = require("../controllers/adminControllers");

// Crear admin
router.post("/", createAdmin);

// Listar admins
router.get("/", getAdmins);

// Obtener un admin por ID
router.get("/:id", getAdminById);

// Actualizar admin por ID
router.patch("/:id", updateAdminById);

// Eliminar un admin
router.delete("/:id", deleteAdminById);

module.exports = router;
