
const validarAcceso = require("./validarAcceso");

async function middlewareCarrera(req, res, next) {
  try {
    const usuarioId = req.user.id; // viene del login/JWT
    const carreraId = req.params.carreraId;

    const permitido = await validarAcceso(usuarioId, carreraId);

    if (!permitido) {
      return res.status(403).json({
        error: "No tienes acceso a esta carrera"
      });
    }

    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error interno" });
  }
}

module.exports = middlewareCarrera;
