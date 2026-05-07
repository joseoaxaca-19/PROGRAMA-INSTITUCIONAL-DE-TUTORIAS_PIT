const { Pool } = require('pg');
const config = require('./config');

const pool = new Pool(config.db);

// Escuchar errores inesperados en clientes inactivos del pool
pool.on('error', (err, client) => {
    console.error('Error inesperado en el cliente de la base de datos:', err);
    process.exit(-1);
});

const query = async (text, params) => {
    try {
        const res = await pool.query(text, params);
        return res;
    } catch (error) {
        console.error("Error en la consulta:", error);
        throw error;
    }
};

module.exports = {
    query,
    pool // Exportamos el pool para poder usar transacciones (client = await pool.connect()) en el futuro
};
