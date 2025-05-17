const express = require ('express')
const db = require("./src/database/connection");

const app = express()

app.use(express.json())

app.get('/', (req,res) => {
    res.send('server running');
})

// Ruta para verificar conexión a la base de datos
app.get("/db-status", (req, res) => {
    if (db.state === "connected") {
        res.send("✅ Conexión a la base de datos exitosa! 🚀");
    } else {
        res.status(500).send("❌ Error en la conexión a la base de datos");
    }
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log("server running in", PORT)
})