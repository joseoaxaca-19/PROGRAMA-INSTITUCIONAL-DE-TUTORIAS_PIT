const express = require("express");
const router = express.Router();


const { login, register, getAllUsers, getAvailableRoles, updateUserRole } = require("../controllers/authController");

// rutas
router.post("/login", login);
router.post("/register", register);
router.get("/users", getAllUsers);
router.get("/roles", getAvailableRoles);
router.put("/user-role", updateUserRole);

module.exports = router;