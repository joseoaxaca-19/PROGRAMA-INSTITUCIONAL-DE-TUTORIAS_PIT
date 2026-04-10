const { Pool } = require('pg');

const pool = new Pool({
    user: '...',
    host: '...',
    database: '...',
    password: '...',
    port: 1111,
});

// Función reutilizable
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
    query
};