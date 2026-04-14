const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "mi_db",
  password: "password",
  port: 5432,
});

async function validarAcceso(usuarioId, carreraId) {
  const query = `
    SELECT EXISTS (
      SELECT 1
      FROM usuario_carrera
      WHERE usuario_id = $1 AND carrera_id = $2
    ) AS permitido;
  `;

  const { rows } = await pool.query(query, [usuarioId, carreraId]);

  return rows[0].permitido;
}
