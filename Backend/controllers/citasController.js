const modelo = require('../models/citaModel');


exports.obtenerCitasDisponibles = async (req, res) => {
    try {
        const citas = await modelo.obtenerDisponibles();
        res.json(citas);
    } catch (error) {
        res.status(500).json({ error: "Error al obtener citas" });
    }
};


exports.seleccionarCita = async (req, res) => {
    const { id_cita, id_tutorado } = req.body;

    if (!id_cita || !id_tutorado) {
        return res.status(400).json({ error: "ID de cita e ID de tutorado requeridos" });
    }

    try {
        const exito = await modelo.seleccionarCita(id_cita, id_tutorado);
        if (exito) {
            res.json({ mensaje: "Cita registrada correctamente" });
        } else {
            res.status(400).json({ error: "La cita no está disponible" });
        }
    } catch (error) {
        res.status(500).json({ error: "Error al registrar cita" });
    }
};