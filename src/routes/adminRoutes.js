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

module.exports = router;
