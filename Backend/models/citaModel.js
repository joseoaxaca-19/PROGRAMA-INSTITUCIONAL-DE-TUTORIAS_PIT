const mysql = require('mysql2/promise');

const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'citas_db'
});

// ===============================
// OBTENER CITAS DISPONIBLES
// ===============================
exports.obtenerDisponibles = async () => {
    try {
        const [rows] = await db.query(`
            SELECT 
                c.id_cita,
                c.fecha,
                c.hora,
                u.correo AS tutor
            FROM tr_citas c
            JOIN tr_user u ON c.id_tutor = u.id_user
            WHERE c.disponible = true
            ORDER BY c.fecha, c.hora
        `);

        return rows;

    } catch (error) {
        console.error("Error en obtenerDisponibles:", error);
        throw error;
    }
}; // 🔥 ESTA LÍNEA FALTABA

// ===============================
// SELECCIONAR CITA
// ===============================
exports.seleccionarCita = async (id_cita, id_tutorado) => {
    try {
        const [cita] = await db.query(
            "SELECT disponible FROM tr_citas WHERE id_cita = ?",
            [id_cita]
        );

        if (cita.length === 0) {
            throw new Error("La cita no existe");
        }

        if (!cita[0].disponible) {
            throw new Error("La cita ya fue reservada");
        }

        await db.query(
            `UPDATE tr_citas 
             SET disponible = false, id_tutorado = ? 
             WHERE id_cita = ?`,
            [id_tutorado, id_cita]
        );

        return { mensaje: "Cita registrada correctamente" };

    } catch (error) {
        console.error("Error en seleccionarCita:", error);
        throw error;
    }
};