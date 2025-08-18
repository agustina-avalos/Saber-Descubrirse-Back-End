const express = require ('express')
const dotenv = require("dotenv");
const connection = require("./src/database/connection");

dotenv.config();
const app = express();

// Middleware para JSON
app.use(express.json());

// Conexión a MongoDB
connection();

app.get('/', (req,res) => {
    res.send('server running');
})

// Puerto del servidor
const PORT = process.env.DB_PORT || 8080;

app.listen(PORT, () => {
    console.log("server running in ", PORT)
})

const adminRoutes = require("./src/routes/adminRoutes");
app.use("/admins", adminRoutes);