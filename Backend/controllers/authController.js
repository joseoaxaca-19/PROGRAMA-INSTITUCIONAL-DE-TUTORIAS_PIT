const db = require("../connection");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { loginSchema, registerSchema } = require("../schemas/auth.schema");

/**
 * Controlador para el registro de nuevos usuarios.
 * Recibe: n_cuenta, correo, password, nombre, carrera, id rol
 */
const register = async (req, res) => {
    const { n_cuenta, email, password, nombre_completo, carrera, id_rol = 3 } = req.body;

    if (!n_cuenta || !email || !password || !nombre_completo) {
        return res.status(400).json({
            success: false,
            message: "Número de cuenta, correo, nombre completo y contraseña son obligatorios."
        });
    }

    try {
        // Verificar si el usuario ya existe
        const checkQuery = `SELECT id_user FROM tr_user WHERE correo = $1 OR n_cuenta = $2`;
        const checkResult = await db.query(checkQuery, [email, n_cuenta]);
        
        if (checkResult.rows.length > 0) {
            return res.status(400).json({
                success: false,
                message: "El correo o número de cuenta ya está registrado."
            });
        }

        // Encriptar la contraseña
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Guardar el usuario en PostgreSQL
        const query = `
            INSERT INTO tr_user (n_cuenta, correo, password, id_rol)
            VALUES ($1, $2, $3, $4)
            RETURNING id_user, correo, n_cuenta;
        `;
        const result = await db.query(query, [n_cuenta, email, hashedPassword, id_rol]);

        return res.status(201).json({
            success: true,
            message: "Usuario registrado exitosamente",
            usuario: result.rows[0]
        });

    } catch (error) {
        console.error("Error en el registro:", error);
        return res.status(500).json({
            success: false,
            message: "Error interno del servidor."
        });
    }
};

/**
 * Controlador para el inicio de sesión (Login).
 * Recibe: nombre_completo (se normaliza) y password.
 */
const login = async (req, res) => {
    try {
        // Doble verificación: Validación y normalización con Zod
        const validatedData = loginSchema.parse(req.body);
        const { nombre_completo: normalizedInput, password } = validatedData;

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
                message: "Error de validación",
                errors: error.errors.map(e => ({ campo: e.path.join('.'), mensaje: e.message }))
            });
        }

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
