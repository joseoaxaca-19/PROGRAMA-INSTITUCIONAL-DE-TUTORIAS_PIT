const { Pool } = require('pg');
const config = require('./config');

const pool = new Pool(config.db);

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
