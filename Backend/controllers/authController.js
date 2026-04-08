/*const users = []; // simulando base de datos

const register = (req, res) => {
    const { email, password } = req.body;

    // verificar si ya existe
    const userExists = users.find(user => user.email === email);

    if (userExists) {
        return res.status(400).json({
            success: false,
            message: "El usuario ya existe"
        });
    }

    // guardar usuario
    users.push({ email, password });

    res.json({
        success: true,
        message: "Usuario registrado correctamente"
    });
};

const login = (req, res) => {
    const { email, password } = req.body;

    const user = users.find(user => user.email === email);

    if (!user) {
        return res.status(404).json({
            success: false,
            message: "Usuario no encontrado"
        });
    }

    if (user.password !== password) {
        return res.status(401).json({
            success: false,
            message: "Contraseña incorrecta"
        });
    }

    res.json({
        success: true,
        message: "Login correcto"
    });
};

module.exports = {
    register,
    login
};*/

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require("../db/connection");

const login = async (req, res) => {

    const { n_cuenta, password } = req.body;

    if (!n_cuenta || !password) {
        return res.status(400).json({
            success: false,
            message: "Número de cuenta y contraseña son obligatorios"
        });
    }

    try {
        // --- Validar credenciales contra la base de datos ---
        const result = await db.query(
            "SELECT id_user, n_cuenta, password, correo, id_rol FROM tr_user WHERE n_cuenta = $1",
            [n_cuenta]
        );

        // Validar si la cuenta existe
        if (result.rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: "El número de cuenta no está registrado"
            });
        }

        const user = result.rows[0];

        // --- Validar contraseña ---
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: "Contraseña incorrecta"
            });
        }

        // --- Implementar control de acceso (JWT) ---
        const token = jwt.sign(
            { id: user.id_user, rol: user.id_rol },
            process.env.JWT_SECRET || 'mi_llave_secreta',
            { expiresIn: '8h' }
        );

        // --- Redirigir al usuario según su rol ---
        res.json({
            success: true,
            message: "Login correcto",
            token,
            rol: user.id_rol // ID del rol (Ej. 1 para tutor, 2 para tutorado)
        });

    } catch (error) {
        console.error("Error en login:", error);
        res.status(500).json({
            success: false,
            message: "Error interno en el servidor"
        });
    }
};

const register = async (req, res) => {
    // Aquí puedes implementar el código para insertar un usuario en la base de datos más adelante
    res.status(200).json({ message: "Servicio de registro en construcción" });
};

module.exports = { login, register };