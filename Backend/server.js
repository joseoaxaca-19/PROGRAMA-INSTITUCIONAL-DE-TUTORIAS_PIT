const express = require("express");
const cors = require("cors");
const config = require("./config");
const { pool } = require("./connection"); // Importamos el pool para probar la conexión

const app = express();

app.use(cors());
app.use(express.json());

// IMPORTANTE: El nombre debe coincidir con el archivo en la carpeta routes
const auth = require("./routes/auth");
const userRoutes = require("./routes/userRoutes");
const citasRoutes = require("./routes/citas");
const appointmentRoutes = require("./routes/appointment.routes");

app.use("/api/auth", auth);
app.use("/api/users", userRoutes);
app.use("/api/citas", citasRoutes);
app.use("/api/appointments", appointmentRoutes);

app.get("/", (req, res) => {
    res.send("Servidor funcionando 🚀");
});

// Probar conexión a la base de datos antes de arrancar el servidor
pool.connect()
    .then(client => {
        console.log("✅ Conectado a la base de datos PostgreSQL exitosamente.");
        client.release();
        
        // Iniciar el servidor solo si hay conexión a la BD
        app.listen(config.port, () => {
            console.log(`🚀 Servidor corriendo en http://localhost:${config.port}`);
        });
    })
    .catch(err => {
        console.error("❌ Error al conectar a la base de datos. Verifica tus credenciales en el archivo .env:", err.message);
        process.exit(1); // Detener la aplicación si no hay base de datos
    });