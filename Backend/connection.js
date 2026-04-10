const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'db_prueba',
    password: 'aguadejamaica11',
    port: 5432,
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
    query
};