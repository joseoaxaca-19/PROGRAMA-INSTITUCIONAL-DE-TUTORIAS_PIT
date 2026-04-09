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

    // Validación básica de entrada
    if (!n_cuenta || !password) {
        return res.status(400).json({
            success: false,
            message: "El número de cuenta y la contraseña son obligatorios."
        });
    }

    try {
        // --- 1. Obtener usuario y rol mediante un JOIN (Optimizado) ---
        const result = await db.query(
            `SELECT u.id_user, u.n_cuenta, u.password, r.nombre_rol 
             FROM tr_user u 
             JOIN tr_roles r ON u.id_rol = r.id_rol 
             WHERE u.n_cuenta = $1`,
            [n_cuenta]
        );

        // --- 2. Validar explícitamente si el número de cuenta existe ---
        if (result.rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: "El número de cuenta no se encuentra registrado.",
                error_code: "ACCOUNT_NOT_FOUND"
            });
        }

        const user = result.rows[0];

        // --- 3. Validar si la contraseña coincide ---
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: "La contraseña proporcionada es incorrecta.",
                error_code: "INVALID_CREDENTIALS"
            });
        }

        // --- 4. Generar Token JWT ---
        const token = jwt.sign(
            { id: user.id_user, rol: user.nombre_rol }, // Incluimos el nombre del rol en el token
            process.env.JWT_SECRET || 'mi_llave_secreta',
            { expiresIn: '8h' }
        );

        // --- 5. Responder al frontend con un JSON profesional ---
        return res.status(200).json({
            success: true,
            message: "Inicio de sesión exitoso.",
            data: {
                user: {
                    id: user.id_user,
                    numero_cuenta: user.n_cuenta,
                    rol: user.nombre_rol
                },
                token
            }
        });

    } catch (error) {
        console.error("Error crítico en login:", error);
        return res.status(500).json({
            success: false,
            message: "Ocurrió un error inesperado en el servidor. Por favor, intente más tarde.",
            error_code: "INTERNAL_SERVER_ERROR"
        });
    }
};

const register = async (req, res) => {
    // Aquí puedes implementar el código para insertar un usuario en la base de datos más adelante
    res.status(200).json({ message: "Servicio de registro en construcción" });
};

module.exports = { login, register };