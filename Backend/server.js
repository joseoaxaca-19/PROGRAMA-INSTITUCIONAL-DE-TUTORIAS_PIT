const express = require("express");
const cors = require("cors");
const middlewareCarrera = require("./middlewares/middlewareCarrera");
const app = express(); // 👈 primero creas la app

app.use(cors());
app.use(express.json());

app.use('/citas', require('./routes/citas'));

const authRoutes = require("./routes/auth");
app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
    res.send("Servidor funcionando 🚀");
});

app.listen(3000, () => {
    console.log("Servidor corriendo en http://localhost:3000");
});
