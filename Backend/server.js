const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const authRoutes = require("./routes/auth");

const citasRoutes = require("./routes/citas");

app.use("/api/auth", authRoutes);

app.use("/api/citas", citasRoutes);

app.get("/", (req, res) => {
    res.send("Servidor funcionando 🚀");
});

app.listen(3000, () => {
    console.log("Servidor corriendo en http://localhost:3000");
});