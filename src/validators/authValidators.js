const { body } = require('express-validator');

// Validaciones para login
const loginValidation = [
  body('email')
    .isEmail()
    .withMessage('Debe ser un email válido')
    .normalizeEmail(),
  
  body('password')
    .notEmpty()
    .withMessage('La contraseña es requerida')
];

// Validaciones para refresh token
const refreshTokenValidation = [
  body('refreshToken')
    .notEmpty()
    .withMessage('El refresh token es requerido')
];

module.exports = {
  loginValidation,
  refreshTokenValidation
};
