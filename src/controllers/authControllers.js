const Admin = require('../models/Admin');
const RefreshToken = require('../models/RefreshToken');
const { generateTokenPair } = require('../utils/generateToken');
const { validationResult } = require('express-validator');


// Login de admin
const login = async (req, res) => {
  try {
    // Verificar errores de validación
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Datos de entrada inválidos',
        errors: errors.array()
      });
    }

    const { email, password } = req.body;

    // Buscar admin por email
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(401).json({
        success: false,
        message: 'Credenciales inválidas'
      });
    }

    // Verificar contraseña
    const isPasswordValid = await admin.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: 'Credenciales inválidas'
      });
    }

    // Revocar refresh tokens anteriores del usuario
    await RefreshToken.updateMany(
      { adminId: admin._id, isRevoked: false },
      { isRevoked: true }
    );

    // Generar nuevo par de tokens
    const { accessToken, refreshToken } = generateTokenPair({
      id: admin._id,
      email: admin.email
    });

    // Guardar nuevo refresh token en base de datos
    const refreshTokenDoc = new RefreshToken({
      token: refreshToken,
      adminId: admin._id,
      expiresAt: new Date(Date.now() + (parseInt(process.env.JWT_REFRESH_EXPIRES_IN) || 7) * 24 * 60 * 60 * 1000)
    });
    await refreshTokenDoc.save();

    // Respuesta sin contraseña
    const adminResponse = admin.toObject();
    delete adminResponse.password;

    res.status(200).json({
      success: true,
      message: 'Login exitoso',
      data: {
        admin: adminResponse,
        accessToken,
        refreshToken
      }
    });

  } catch (error) {
    console.error('Error en login:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor'
    });
  }
};

// Logout de admin
const logout = async (req, res) => {
  try {
    const { refreshToken } = req.body;
    const adminId = req.admin.id;

    if (refreshToken) {
      // Revocar el refresh token específico
      await RefreshToken.findOneAndUpdate(
        { token: refreshToken, adminId: adminId },
        { isRevoked: true }
      );
    } else {
      // Si no se proporciona refresh token, revocar todos los tokens del usuario
      await RefreshToken.updateMany(
        { adminId: adminId, isRevoked: false },
        { isRevoked: true }
      );
    }

    res.status(200).json({
      success: true,
      message: 'Logout exitoso'
    });

  } catch (error) {
    console.error('Error en logout:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor'
    });
  }
};

// Obtener perfil del admin autenticado
const getProfile = async (req, res) => {
  try {
    const admin = req.admin; // Viene del middleware de autenticación

    res.status(200).json({
      success: true,
      message: 'Perfil obtenido exitosamente',
      data: {
        admin
      }
    });

  } catch (error) {
    console.error('Error obteniendo perfil:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor'
    });
  }
};

// Refrescar access token usando refresh token
const refreshAccessToken = async (req, res) => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return res.status(400).json({
        success: false,
        message: 'Refresh token requerido'
      });
    }

    // Buscar el refresh token en la base de datos
    const refreshTokenDoc = await RefreshToken.findOne({
      token: refreshToken,
      isRevoked: false
    }).populate('adminId');

    if (!refreshTokenDoc) {
      return res.status(401).json({
        success: false,
        message: 'Refresh token inválido o revocado'
      });
    }

    // Verificar si el token está expirado
    if (refreshTokenDoc.isExpired()) {
      await refreshTokenDoc.revoke();
      return res.status(401).json({
        success: false,
        message: 'Refresh token expirado'
      });
    }

    // Verificar que el admin aún existe
    if (!refreshTokenDoc.adminId) {
      await refreshTokenDoc.revoke();
      return res.status(401).json({
        success: false,
        message: 'Usuario no encontrado'
      });
    }

    // Generar nuevo par de tokens
    const { accessToken, refreshToken: newRefreshToken } = generateTokenPair({
      id: refreshTokenDoc.adminId._id,
      email: refreshTokenDoc.adminId.email
    });

    // Revocar el refresh token anterior
    await refreshTokenDoc.revoke();

    // Crear nuevo refresh token
    const newRefreshTokenDoc = new RefreshToken({
      token: newRefreshToken,
      adminId: refreshTokenDoc.adminId._id,
      expiresAt: new Date(Date.now() + (parseInt(process.env.JWT_REFRESH_EXPIRES_IN) || 7) * 24 * 60 * 60 * 1000)
    });
    await newRefreshTokenDoc.save();

    res.status(200).json({
      success: true,
      message: 'Tokens refrescados exitosamente',
      data: {
        accessToken,
        refreshToken: newRefreshToken
      }
    });

  } catch (error) {
    console.error('Error refrescando token:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor'
    });
  }
};

module.exports = {
  login,
  logout,
  getProfile,
  refreshAccessToken
};
