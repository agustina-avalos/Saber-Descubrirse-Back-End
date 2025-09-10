const express = require('express');
const { login, logout, getProfile, refreshAccessToken } = require('../controllers/authControllers');
const { authenticateToken } = require('../middlewares/auth');
const { loginValidation, refreshTokenValidation } = require('../validators/authValidators');

const router = express.Router();

// Rutas públicas
router.post('/login', loginValidation, login);
router.post('/refresh', refreshTokenValidation, refreshAccessToken);

// Rutas protegidas
router.post('/logout', authenticateToken, logout);
router.get('/profile', authenticateToken, getProfile);

module.exports = router;
