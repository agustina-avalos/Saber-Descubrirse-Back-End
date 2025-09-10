const mongoose = require("mongoose");

const refreshTokenSchema = new mongoose.Schema(
  {
    token: { 
      type: String, 
      required: true, 
      unique: true 
    },
    adminId: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'Admin', 
      required: true 
    },
    expiresAt: { 
      type: Date, 
      required: true 
    },
    isRevoked: { 
      type: Boolean, 
      default: false 
    },
    createdAt: { 
      type: Date, 
      default: Date.now 
    }
  },
  { 
    toJSON: { virtuals: true }, 
    toObject: { virtuals: true } 
  }
);

// Índice para eliminar automáticamente tokens expirados
refreshTokenSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

// Método para verificar si el token está expirado
refreshTokenSchema.methods.isExpired = function() {
  return Date.now() >= this.expiresAt.getTime();
};

// Método para revocar el token
refreshTokenSchema.methods.revoke = function() {
  this.isRevoked = true;
  return this.save();
};

module.exports = mongoose.model("RefreshToken", refreshTokenSchema);
