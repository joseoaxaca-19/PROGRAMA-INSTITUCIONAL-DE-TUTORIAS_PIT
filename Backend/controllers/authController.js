const bcrypt = require("bcrypt");
const db = require("../db/connection");

const register = async (req, res) => {
    try {
        const { n_cuenta, password, correo, id_rol, carrera } = req.body;

        if (!n_cuenta || !password || !correo || !id_rol || !carrera) {
            return res.status(400).json({
                success: false,
                message: "Todos los campos son obligatorios"
            });
        }

        const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
        if (!emailRegex.test(correo)) {
            return res.status(400).json({
                success: false,
                message: "El formato del correo no es valido"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const query = 'INSERT INTO tr_user (n_cuenta, password, correo, id_rol, carrera) VALUES ($1, $2, $3, $4, $5) RETURNING n_cuenta, correo, id_rol, carrera';
        const values = [n_cuenta, hashedPassword, correo, id_rol, carrera];

        const result = await db.query(query, values);
        
        return res.status(201).json({
            success: true,
            message: "Usuario registrado de manera exitosa",
            user: result.rows[0]
        });

    } catch (error) {
        if (error.code === '23505') {
            if (error.detail && error.detail.includes('n_cuenta')) {
                return res.status(400).json({
                    success: false,
                    message: "El numero de cuenta ya esta registrado"
                });
            }
            if (error.detail && error.detail.includes('correo')) {
                return res.status(400).json({
                    success: false,
                    message: "El correo ya esta registrado"
                });
            }
            return res.status(400).json({
                success: false,
                message: "Conflicto de datos unicos"
            });
        }

        console.error("Error en registro:", error);
        return res.status(500).json({
            success: false,
            message: "Error interno del servidor"
        });
    }
};

const login = async (req, res) => {
    try {
        const { correo, password } = req.body;

        if (!correo || !password) {
            return res.status(400).json({
                success: false,
                message: "El correo y la contrasena son obligatorios."
            });
        }

        const query = 'SELECT * FROM tr_user WHERE correo = $1';
        const result = await db.query(query, [correo]);

        if (result.rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Usuario no encontrado."
            });
        }

        const user = result.rows[0];
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: "Contrasena incorrecta."
            });
        }

        delete user.password;

        return res.status(200).json({
            success: true,
            message: "Login correcto.",
            user: user
        });

    } catch (error) {
        console.error('Error interno en login:', error);
        return res.status(500).json({
            success: false,
            message: "Ocurrio un error interno en el servidor."
        });
    }
};

module.exports = {
    register,
    login
};
