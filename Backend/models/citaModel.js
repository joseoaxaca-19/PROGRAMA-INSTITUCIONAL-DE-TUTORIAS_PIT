const mysql = require('mysql2/promise');

const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'citas_db'
});


// OBTENER CITAS DISPONIBLES

exports.obtenerDisponibles = async () => {
    try {
       const [rows] = await db.query(
            "SELECT * FROM tr_citas WHERE disponible = TRUE ORDER BY fecha ASC, hora ASC"
        );
        return rows;
    } catch (error) {
        console.error('Error al consultar las citas disponibles:', error);
        throw error;
    }
};


// SELECCIONAR CITA

exports.seleccionarCita = async (id_cita, id_tutorado) => {
   if (!id_cita || !id_tutorado) {
        throw new Error('id_cita and id_tutorado are required');
    }
    
    try {
        const [result] = await db.query(
            "UPDATE tr_citas SET disponible = FALSE, id_tutorado = ? WHERE id_cita = ? AND disponible = TRUE",
            [id_tutorado, id_cita]
        );
        return result.affectedRows > 0;
    } catch (error) {
        console.error('Error al registrar cita:', error);
        throw error;
    }
};