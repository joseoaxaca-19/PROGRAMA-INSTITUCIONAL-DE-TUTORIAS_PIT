const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// IMPORTANTE: El nombre debe coincidir con el archivo en la carpeta routes
const auth = require("./routes/auth");
const userRoutes = require("./routes/userRoutes");

app.use("/api/auth", auth);
app.use("/api/users", userRoutes);

app.get("/", (req, res) => {
    res.send("Servidor funcionando 🚀");
});

app.listen(3000, () => {
    console.log("Servidor corriendo en http://localhost:3000");
});