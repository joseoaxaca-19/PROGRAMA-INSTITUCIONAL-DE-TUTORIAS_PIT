const express = require("express");
const middlewareCarrera = require("./middlewareCarrera");

const app = express();

app.get("/contenido/:carreraId", middlewareCarrera, (req, res) => {
  res.json({ mensaje: "Contenido protegido" });
});

app.listen(3000, () => {
  console.log("Servidor corriendo en puerto 3000");
});
