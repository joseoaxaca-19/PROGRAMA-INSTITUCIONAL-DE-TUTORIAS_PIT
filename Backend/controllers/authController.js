const db = require("../connection");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

/**
 * Controlador para el endpoint de inicio de sesión (Login)
 * Realiza la validación de credenciales y emite un JWT con el rol del usuario.
 */
const login = async (req, res) => {
    // 1. Recepción de datos: nombre_completo y Password son requeridos
    const { nombre_completo, password } = req.body;

    // Validación de campos vacíos
    if (!nombre_completo || !password) {
        return res.status(400).json({
            success: false,
            message: "El nombre completo y la contraseña son obligatorios."
        });
    }

    try {
        // 2. Consulta a PostgreSQL: Buscar el usuario por nombre completo
        // Asume que la tabla original es 'tr_user' con columnas 'nombre' y 'apellidos'
        // adaptando al nuevo requerimiento de validación.
        const query = `
            SELECT u.id_user, u.nombre, u.apellidos, u.password, r.nombre_rol AS role_name
            FROM tr_user u
            INNER JOIN tr_roles r ON u.id_rol = r.id_rol
            WHERE TRIM(u.nombre || ' ' || u.apellidos) ILIKE $1
        `;

        const result = await db.query(query, [nombre_completo.trim()]);

        // 3. Verificar si la cuenta existe en la base de datos
        if (result.rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Usuario no encontrado. Verifique su nombre completo."
            });
        }

        const user = result.rows[0];

        // 4. Validar que la contraseña coincida (usando bcrypt)
        const validPassword = await bcrypt.compare(password, user.password);

        if (!validPassword) {
            return res.status(401).json({
                success: false,
                message: "Contraseña incorrecta."
            });
        }

        // 5. Generación del JSON Web Token (JWT)
        const tokenPayload = {
            id: user.id_user,
            nombre_completo: `${user.nombre} ${user.apellidos}`,
            rol: user.role_name
        };

        // Se utiliza la clave secreta desde variables de entorno
        const secretKey = process.env.JWT_SECRET || 'llave_secreta_desarrollo_pit';
        const token = jwt.sign(tokenPayload, secretKey, { expiresIn: '8h' });

        // 6. Respuesta estandarizada al Frontend
        return res.status(200).json({
            success: true,
            message: "Inicio de sesión exitoso.",
            token: token,
            role: user.role_name
        });

    } catch (error) {
        console.error("Error en el proceso de login:", error);
        return res.status(500).json({
            success: false,
            message: "Error interno del servidor."
        });
    }
};

/**
 * Endpoint de Registro (Habilitado para que puedas crear usuarios de prueba)
 */
const register = async (req, res) => {
    // Tomamos n_cuenta, correo, password y id_rol (por defecto 3 = Tutorado)
    const { n_cuenta, email, password, id_rol = 3 } = req.body;

    if (!n_cuenta || !email || !password) {
        return res.status(400).json({
            success: false,
            message: "Número de cuenta, correo y contraseña son obligatorios."
        });
    }

    try {
        // Encriptar la contraseña insertada
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Guardar el usuario de prueba en PostgreSQL (tabla tr_user)
        const query = `
            INSERT INTO tr_user (n_cuenta, correo, password, id_rol)
            VALUES ($1, $2, $3, $4)
            RETURNING id_user, correo;
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
            message: "Error interno, verifica tu BD y que 'tr_roles' tenga el id_rol 3."
        });
    }
};

module.exports = {
    login,
    register
};
