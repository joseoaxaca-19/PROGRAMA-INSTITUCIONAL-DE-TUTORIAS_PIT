const db = require("../connection");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { loginSchema, registerSchema } = require("../schemas/auth.schema");

/**
 * Controlador para el registro de nuevos usuarios.
 * Recibe: numero_cuenta, nombre, apellidos, correo, id_carrera, id_rol, password.
 */
const register = async (req, res) => {
    try {
        const validatedData = registerSchema.parse(req.body);
        const { numero_cuenta, nombre, apellidos, correo, id_carrera, id_rol, password } = validatedData;

        // Verificar que el número de cuenta sea único
        const cuentaExistente = await db.query(
            'SELECT id FROM usuarios WHERE numero_cuenta = $1',
            [numero_cuenta]
        );
        if (cuentaExistente.rows.length > 0) {
            return res.status(409).json({
                success: false,
                message: "El número de cuenta ya está registrado."
            });
        }

        // Verificar que el correo sea único
        const correoExistente = await db.query(
            'SELECT id FROM usuarios WHERE correo = $1',
            [correo]
        );
        if (correoExistente.rows.length > 0) {
            return res.status(409).json({
                success: false,
                message: "El correo electrónico ya está registrado."
            });
        }

        // Encriptar la contraseña
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insertar en la tabla 'usuarios'
        const insertQuery = `
            INSERT INTO usuarios (numero_cuenta, nombre, apellidos, correo, id_carrera, id_rol, contrasena)
            VALUES ($1, $2, $3, $4, $5, $6, $7)
            RETURNING id, numero_cuenta, nombre, apellidos, correo;
        `;
        const values = [numero_cuenta, nombre, apellidos, correo, id_carrera, id_rol, hashedPassword];
        const result = await db.query(insertQuery, values);

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
                message: "Error de validación",
                errors: error.errors.map(e => ({ campo: e.path.join('.'), mensaje: e.message }))
            });
        }

        console.error("Error en el registro:", error);

        if (error.code === '23503') {
            return res.status(400).json({
                success: false,
                message: "La carrera o el rol especificado no existen."
            });
        }

        // Violación de unicidad a nivel de BD (número de cuenta o correo duplicado)
        if (error.code === '23505') {
            return res.status(409).json({
                success: false,
                message: "El número de cuenta o correo ya están en uso."
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

const getRoles = async (req, res) => {
    try {
        const result = await db.query('SELECT id, nombre FROM roles ORDER BY id');
        return res.status(200).json({ success: true, data: result.rows });
    } catch (error) {
        console.error("Error obteniendo roles:", error);
        return res.status(500).json({ success: false, message: "Error al obtener roles." });
    }
};

const getCarreras = async (req, res) => {
    try {
        const result = await db.query('SELECT id, nombre FROM carreras ORDER BY nombre');
        return res.status(200).json({ success: true, data: result.rows });
    } catch (error) {
        console.error("Error obteniendo carreras:", error);
        return res.status(500).json({ success: false, message: "Error al obtener carreras." });
    }
};

module.exports = {
    register,
    login,
    getRoles,
    getCarreras
};
