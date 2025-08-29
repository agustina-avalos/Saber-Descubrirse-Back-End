const { body, validationResult} = require("express-validator");
const Carrusel = require("../models/Carrusel");

const validateCarrusel = [
  body("imageUrl")
    .optional() // Permite que el campo sea opcional en PATCH, obligatorio en POST si lo manejas en el controlador
    .isURL()
    .withMessage("Debe ser una URL válida")
    .matches(/\.(jpeg|jpg|gif|png)$/)
    .withMessage("La URL debe apuntar a una imagen (jpeg, jpg, gif, png)"),

  body('order')
    .optional()
    .isInt({ min: 1 }).withMessage('El orden debe ser un número entero positivo')
    .custom(async (value, { req }) => {
      if (value === undefined) return true;
      // Si es PATCH, excluye el documento actual usando req.params.id
      const query = { order: value };
      if (req.params && req.params.id) {
        query._id = { $ne: req.params.id }; //Al buscar si existe otro documento con el mismo order, excluye el documento que estás editando.
      }
      const exists = await Carrusel.findOne(query);
      if (exists) {
        throw new Error('Ya existe una imagen con ese valor de orden');
      }
      return true;
    }),

  // Middleware para manejar y responder los errores de validación
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }


];

module.exports = { validateCarrusel };