const express = require ('express')
const dotenv = require("dotenv");
const connection = require("./src/database/connection");
dotenv.config();
const app = express();

const adminRoutes = require("./src/routes/adminRoutes");
const turnosRoutes = require("./src/routes/turnosRoutes");
const carruselRoutes = require("./src/routes/carruselRoutes");
const contenidoPaginaRoutes = require("./src/routes/contenidoPaginaRoutes");
const experienciaRoutes = require("./src/routes/experienciaRoutes");
const suscriptorRoutes = require("./src/routes/suscriptorRoutes");


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
app.use("/carrusel", carruselRoutes);
app.use("/contenidoPagina", contenidoPaginaRoutes);
app.use("/experiencias", experienciaRoutes);
app.use("/suscriptores", suscriptorRoutes);