const express = require('express');
const router = express.Router();
const { createExperiencia, getAllExperiencias, getExperienciasAprobadas, approveExperiencia, deleteExperiencia } = require('../controllers/experienciaControllers');

router.post('/', createExperiencia);

router.get('/all', getAllExperiencias);

router.get('/', getExperienciasAprobadas);

router.patch('/:id', approveExperiencia);

router.delete('/:id', deleteExperiencia);



module.exports = router;