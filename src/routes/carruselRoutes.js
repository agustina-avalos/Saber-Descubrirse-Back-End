const express = require('express');
const router = express.Router();
const { postImage, getImages, updateImage, deleteImage } = require('../controllers/carruselControllers');
const { validateCarrusel } = require('../validators/carruselValidator');


router.post('/', validateCarrusel, postImage);

router.get('/', getImages);

router.patch('/:id', validateCarrusel, updateImage);

router.delete('/:id', deleteImage);


module.exports = router;
