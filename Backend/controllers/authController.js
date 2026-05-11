const pool = require("../config/db"); // ← Cambiado de "./db" a "../config/db"

async function validarAcceso(usuarioId, carreraId) {
  const query = `
    SELECT EXISTS (
      SELECT 1
      FROM usuario
      WHERE usuario_id = $1 AND carrera_id = $2
    ) AS permitido;
  `;

  const { rows } = await pool.query(query, [usuarioId, carreraId]);

  return rows[0]?.permitido || false;
}

module.exports = validarAcceso;
