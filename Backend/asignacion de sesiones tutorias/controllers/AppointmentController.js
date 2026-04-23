const Appointment = require('../models/Appointment');

// 1. Proponer una cita (Tutor)
exports.proposeAppointment = async (req, res) => {
  try {
    const { tutorName, tuteeName, proposedDateTime, notes } = req.body;

    if (!tutorName || !tuteeName || !proposedDateTime) {
      return res.status(400).json({ error: 'Faltan campos obligatorios' });
    }

    const newAppointment = await Appointment.create({
      tutorName,
      tuteeName,
      proposedDateTime,
      notes,
      status: 'pendiente'
    });

    res.status(201).json({
      message: 'Propuesta de cita creada con éxito',
      appointment: newAppointment
    });
  } catch (error) {
    res.status(500).json({ error: 'Error al crear la propuesta', details: error.message });
  }
};

// 2. Aceptar o rechazar cita (Tutorado)
exports.updateStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body; // 'aceptada' o 'rechazada'

    if (!['aceptada', 'rechazada'].includes(status)) {
      return res.status(400).json({ error: 'Estado no válido. Use "aceptada" o "rechazada"' });
    }

    const appointment = await Appointment.findByPk(id);

    if (!appointment) {
      return res.status(404).json({ error: 'Cita no encontrada' });
    }

    appointment.status = status;
    await appointment.save();

    res.json({
      message: `Cita ${status} con éxito`,
      appointment
    });
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar el estado', details: error.message });
  }
};

// 3. Obtener todas las citas (Opcional, para visualización)
exports.getAllAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.findAll({
        order: [['proposedDateTime', 'ASC']]
    });
    res.json(appointments);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener citas', details: error.message });
  }
};
