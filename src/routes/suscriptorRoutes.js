const express = require('express');
const router = express.Router();

const { createSuscriptor, getAllSuscriptores, deleteSuscriptor } = require('../controllers/suscriptorControllers');
const validateSuscriptor = require('../validators/suscriptorValidator');

router.post('/', validateSuscriptor, createSuscriptor);

router.get('/', getAllSuscriptores);

router.patch('/:id', deleteSuscriptor);


module.exports = router;