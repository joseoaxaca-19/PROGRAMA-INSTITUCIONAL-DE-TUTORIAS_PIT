const db = require("../connection");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

/**
 * Controlador para el registro de nuevos usuarios.
 * Recibe: nombre, apellidos, id_carrera, id_rol, password.
 */
const register = async (req, res) => {
    const { nombre, apellidos, id_carrera, id_rol, password } = req.body;

    // Validación de campos obligatorios
    if (!nombre || !apellidos || !id_carrera || !id_rol || !password) {
        return res.status(400).json({
            success: false,
            message: "Todos los campos (nombre, apellidos, id_carrera, id_rol, password) son obligatorios."
        });
    }

    try {
        // Encriptar la contraseña
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Insertar en la tabla 'usuarios'
        const query = `
            INSERT INTO usuarios (nombre, apellidos, id_carrera, id_rol, contrasena)
            VALUES ($1, $2, $3, $4, $5)
            RETURNING id, nombre, apellidos;
        `;
        const values = [nombre, apellidos, id_carrera, id_rol, hashedPassword];
        const result = await db.query(query, values);

        return res.status(201).json({
            success: true,
            message: "Usuario registrado exitosamente.",
            usuario: result.rows[0]
        });

    } catch (error) {
        console.error("Error en el registro:", error);

        // Manejo básico de errores de BD (ej. violación de FK)
        if (error.code === '23503') {
            return res.status(400).json({
                success: false,
                message: "La carrera o el rol especificado no existen."
            });
        }

        return res.status(500).json({
            success: false,
            message: "Ocurrió un error interno en el servidor."
        });
    }
};

/**
 * Controlador para el inicio de sesión (Login).
 * Recibe: nombre_completo (se normaliza) y password.
 */
const login = async (req, res) => {
    const { nombre_completo, password } = req.body;

    if (!nombre_completo || !password) {
        return res.status(400).json({
            success: false,
            message: "El nombre completo y la contraseña son obligatorios."
        });
    }

    try {
        // Normalización: Mayúsculas y sin espacios
        const normalizedInput = nombre_completo.toUpperCase().replace(/\s/g, '');

        // Consulta buscando por nombre completo concatenado y normalizado
        const query = `
            SELECT u.id, u.nombre, u.apellidos, u.contrasena, r.nombre AS role_name
            FROM usuarios u
            INNER JOIN roles r ON u.id_rol = r.id
            WHERE UPPER(REPLACE(u.nombre || u.apellidos, ' ', '')) = $1
        `;

        const result = await db.query(query, [normalizedInput]);

        if (result.rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Usuario no encontrado."
            });
        }

        const user = result.rows[0];

        // Validar contraseña
        const validPassword = await bcrypt.compare(password, user.contrasena);

        if (!validPassword) {
            return res.status(401).json({
                success: false,
                message: "Contraseña incorrecta."
            });
        }

        // Generar JWT
        const tokenPayload = {
            id: user.id,
            nombre: `${user.nombre} ${user.apellidos}`,
            role: user.role_name
        };

        const secretKey = process.env.JWT_SECRET || 'llave_secreta_desarrollo_pit';
        const token = jwt.sign(tokenPayload, secretKey, { expiresIn: '8h' });

        return res.status(200).json({
            success: true,
            message: "Inicio de sesión exitoso.",
            token,
            user: {
                id: user.id,
                nombre_completo: `${user.nombre} ${user.apellidos}`,
                role: user.role_name
            }
        });

    } catch (error) {
        console.error("Error en el login:", error);
        return res.status(500).json({
            success: false,
            message: "Ocurrió un error interno en el servidor."
        });
    }
};

module.exports = {
    register,
    login
};
