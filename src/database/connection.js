const mysql = require('mysql');
require("dotenv").config();


// Conexión a la base de datos
const connection = mysql.createConnection({
    host: process.env.DB_HOST,   // IP o dominio del servidor
    user: process.env.DB_USER,   // Usuario de la base
    password: process.env.DB_PASSWORD,  // Contraseña
    database: process.env.DB_NAME,      // Nombre de tu base de datos
    port: process.env.DB_PORT || 3306   // Puerto MySQL (opcional)
  });


// Conectamos
connection.connect((err) => {
    if (err) {
      console.error('Error de conexión a la BD:', err.stack);
      return;
    }
    console.log('Conectado a la base de datos como id ' + connection.threadId);
  });
  
  module.exports = connection;