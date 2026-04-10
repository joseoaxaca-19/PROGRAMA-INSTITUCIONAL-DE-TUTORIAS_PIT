// Registro de usuarios, login con base al correo y contraseña,
// encriptación de contraseña con bcrypt

const login_test = async (req, res) => {

    try {

        // Asumiendo que el login se hace con el correo

        const { correo, password } = req.body;



        // 1. Validar que se envíen los datos

        if (!correo || !password) {

            return res.status(400).json({

                success: false,

                message: "El correo y la contraseña son obligatorios."

            });

        }



        // 2. Buscar al usuario en la base de datos

        const query = 'SELECT * FROM tr_user WHERE correo = $1';

        const result = await pool.query(query, [correo]);



        // Si no hay resultados, el usuario no existe

        if (result.rows.length === 0) {

            return res.status(404).json({

                success: false,

                message: "Usuario no encontrado."

            });

        }



        const user = result.rows[0];



        // 3. Verificar la contraseña

        // bcrypt.compare toma la contraseña en texto plano y el hash de la BD

        const isMatch = await bcrypt.compare(password, user.password);



        if (!isMatch) {

            return res.status(401).json({

                success: false,

                message: "Contraseña incorrecta."

            });

        }



        // 4. Preparar la respuesta eliminando datos sensibles

        // Es una buena práctica no enviar el hash de la contraseña de vuelta al cliente

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

            message: "Ocurrió un error interno en el servidor."

        });

    }

};



module.exports = {

    registerUser, // Tu función de registro (asegúrate de que los nombres coincidan con tu auth.js)

    login

};

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
