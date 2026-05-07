const db = require("../connection");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("../config");
const { loginSchema, registerSchema } = require("../schemas/auth.schema");

/**
 * Controlador para el registro de nuevos usuarios.
 */
const register = async (req, res) => {
    try {
        const validatedData = registerSchema.parse(req.body);
        const { nombre, apellidos, id_carrera, id_rol, password } = validatedData;

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

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
            data: {
                usuario: result.rows[0]
            }
        });

    } catch (error) {
        if (error.name === "ZodError") {
            return res.status(400).json({
                success: false,
                message: "Datos de entrada inválidos.",
                errors: error.errors.map(e => ({ campo: e.path.join('.'), mensaje: e.message }))
            });
        }

        console.error("Error en el registro:", error);

        // Errores de Base de Datos
        if (error.code === '23505') { // Unique violation
            return res.status(409).json({
                success: false,
                message: "El usuario ya se encuentra registrado."
            });
        }
        
        if (error.code === '23503') { // Foreign key violation
            return res.status(400).json({
                success: false,
                message: "La carrera o el rol especificado no son válidos."
            });
        }

        return res.status(500).json({
            success: false,
            message: "Ocurrió un error inesperado. Por favor, intente más tarde."
        });
    }
};

/**
 * Controlador para el inicio de sesión (Login).
 * Sugerencia: Usar un identificador único como email o matrícula en lugar de concatenar nombres.
 */
const login = async (req, res) => {
    try {
        const validatedData = loginSchema.parse(req.body);
        const { nombre_completo: normalizedInput, password } = validatedData;

        // Búsqueda de usuario (Sigue usando la lógica de nombre por ahora, pero más limpia)
        const query = `
            SELECT u.id, u.nombre, u.apellidos, u.contrasena, r.nombre AS role_name
            FROM usuarios u
            INNER JOIN roles r ON u.id_rol = r.id
            WHERE UPPER(REPLACE(u.nombre || u.apellidos, ' ', '')) = $1
            LIMIT 1
        `;

        const result = await db.query(query, [normalizedInput]);

        if (result.rows.length === 0) {
            // Mensaje genérico para evitar enumeración de usuarios
            return res.status(401).json({
                success: false,
                message: "Credenciales incorrectas."
            });
        }

        const user = result.rows[0];
        const validPassword = await bcrypt.compare(password, user.contrasena);

        if (!validPassword) {
            return res.status(401).json({
                success: false,
                message: "Credenciales incorrectas."
            });
        }

        // Generar JWT usando la llave del config
        const tokenPayload = {
            id: user.id,
            role: user.role_name
        };

        const token = jwt.sign(tokenPayload, config.jwtSecret, { expiresIn: '8h' });

        return res.status(200).json({
            success: true,
            message: "Bienvenido al sistema.",
            data: {
                token,
                user: {
                    id: user.id,
                    nombre_completo: `${user.nombre} ${user.apellidos}`,
                    role: user.role_name
                }
            }
        });

    } catch (error) {
        if (error.name === "ZodError") {
            return res.status(400).json({
                success: false,
                message: "Datos de entrada inválidos.",
                errors: error.errors.map(e => ({ campo: e.path.join('.'), mensaje: e.message }))
            });
        }

        console.error("Error en el login:", error);
        return res.status(500).json({
            success: false,
            message: "Ocurrió un error interno. Intente de nuevo más tarde."
        });
    }
};

module.exports = {
    register,
    login
};

