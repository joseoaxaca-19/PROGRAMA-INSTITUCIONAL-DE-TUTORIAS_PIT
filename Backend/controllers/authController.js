/*const users = []; // simulando base de datos

const register = (req, res) => {
    const { email, password } = req.body;

    // verificar si ya existe
    const userExists = users.find(user => user.email === email);

    if (userExists) {
        return res.status(400).json({
            success: false,
            message: "El usuario ya existe :D"
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

const db = require("../db/connection");
const login = async (req, res) => {
    const { email, password } = req.body;

    // validar campos vacíos
    if (!email || !password) {
        return res.status(400).json({
            success: false,
            message: "Email y contraseña son obligatorios"
        });
    }

    try {
        // buscar usuario en la BD
        const result = await db.query(
            "SELECT * FROM users WHERE email = $1",
            [email]
        );

        // validar si existe
        if (result.rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Usuario no encontrado"
            });
        }

        const user = result.rows[0];

        // validar contraseña
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

    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Error en el servidor"
        });
    }
};
