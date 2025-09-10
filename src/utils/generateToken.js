const jwt = require('jsonwebtoken');
const crypto = require('crypto');

// Generar Access Token (JWT corto)
const generateAccessToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_ACCESS_EXPIRES_IN || '15m' // Token de acceso corto
  });
};

// Generar Refresh Token (string aleatorio largo)
const generateRefreshToken = () => {
  return crypto.randomBytes(64).toString('hex');
};

// Verificar Access Token
const verifyAccessToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};

// Generar par de tokens (access + refresh)
const generateTokenPair = (payload) => {
  const accessToken = generateAccessToken(payload);
  const refreshToken = generateRefreshToken();
  
  return {
    accessToken,
    refreshToken
  };
};

module.exports = {
  generateAccessToken,
  generateRefreshToken,
  verifyAccessToken,
  generateTokenPair
};