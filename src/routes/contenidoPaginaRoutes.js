const express = require('express');
const router = express.Router();
const { createContenidoPagina, updateContenidoPagina } = require('../controllers/contenidoPaginaControllers');  

router.post('/', createContenidoPagina);

router.patch('/:section', updateContenidoPagina);

module.exports = router;