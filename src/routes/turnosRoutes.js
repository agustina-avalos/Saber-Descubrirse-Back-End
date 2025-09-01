const express = require('express');
const router = express.Router();
const { createTurno, getAllTurnos, getTurnoById, updateTurno, deleteTurno } = require('../controllers/turnosControllers');


router.post('/', createTurno);


router.get("/", getAllTurnos);


router.get("/:id", getTurnoById);


router.patch("/:id", updateTurno);


router.delete("/:id", deleteTurno);


module.exports = router;