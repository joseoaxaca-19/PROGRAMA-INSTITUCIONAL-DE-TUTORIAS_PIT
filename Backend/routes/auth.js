const express = require("express");
const router = express.Router();

const { login, register, getRoles, getCarreras } = require("../controllers/authController");

// rutas
router.post("/login", login);
router.post("/register", register);

// catálogos para el formulario de registro
router.get("/roles", getRoles);
router.get("/carreras", getCarreras);

module.exports = router;