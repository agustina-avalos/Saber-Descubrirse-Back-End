const express = require ('express')
const dotenv = require("dotenv");
const connection = require("./src/database/connection");
const adminRoutes = require("./src/routes/adminRoutes");
const turnosRoutes = require("./src/routes/turnosRoutes");

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


app.use("/admins", adminRoutes);
app.use("/turnos", turnosRoutes);