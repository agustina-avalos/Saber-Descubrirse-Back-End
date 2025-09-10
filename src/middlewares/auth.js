const { verifyAccessToken } = require('../utils/generateToken');
const Admin = require('../models/Admin');

const authenticateToken = async (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Separo el Bearer(pos 0) del TOKEN(pos 1) y tomo solo el TOKEN

    if (!token) {
      return res.status(401).json({ 
        success: false, 
        message: 'Token de acceso requerido' 
      });
    }

    const decoded = verifyAccessToken(token);
    const admin = await Admin.findById(decoded.id).select('-password'); //excluyo la password
    
    if (!admin) {
      return res.status(401).json({ 
        success: false, 
        message: 'Token inválido - usuario no encontrado' 
      });
    }

    req.admin = admin; //agrego el admin al request para que pueda ser usado en el controlador
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ 
        success: false, 
        message: 'Token expirado' 
      });
    }
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ 
        success: false, 
        message: 'Token inválido' 
      });
    }
    return res.status(500).json({ 
      success: false, 
      message: 'Error interno del servidor' 
    });
  }
};

module.exports = {
  authenticateToken
};