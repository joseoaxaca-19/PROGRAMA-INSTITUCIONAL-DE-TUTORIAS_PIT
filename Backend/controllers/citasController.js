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
    const { id } = req.body;

    
    if (!id) {
        return res.status(400).json({ error: "ID requerido" });
    }

    try {
        await modelo.seleccionarCita(id);
        res.json({ mensaje: "Cita registrada correctamente" });
    } catch (error) {
        res.status(500).json({ error: "Error al registrar cita" });
    }
};