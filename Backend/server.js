const express = require("express");
const cors = require("cors");
require('dotenv').config();

const app = express();

// Configuración CORS para Vercel
app.use(cors({
    origin: ['http://localhost:5173', 'https://tu-frontend.vercel.app'],
    credentials: true
}));
app.use(express.json());

// Importar rutas
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/userRoutes");
const citasRoutes = require("./routes/citas");

// Endpoints principales
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/citas", citasRoutes);

// Endpoint de prueba
app.get("/api/health", (req, res) => {
    res.json({ status: "OK", message: "Servidor PIT funcionando 🚀" });
});

// Puerto
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto ${PORT}`);
});