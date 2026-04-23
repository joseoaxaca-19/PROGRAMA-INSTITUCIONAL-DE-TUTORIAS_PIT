const appointmentService = require('../services/appointment.service');
const { createAppointmentSchema } = require('../schemas/appointment.schema');

const createAppointment = async (req, res) => {
    // Verificar rol de Administrador
    if (!req.user || !req.user.rol || req.user.rol.toLowerCase() !== 'administrador') {
        return res.status(403).json({
            success: false,
            message: "Acceso denegado: solo el Administrador puede realizar esta acción."
        });
    }

    // Validación de entrada con Zod
    const validationResult = createAppointmentSchema.safeParse(req.body);

    if (!validationResult.success) {
        return res.status(400).json({
            success: false,
            message: "Errores de validación de entrada",
            errors: validationResult.error.errors
        });
    }

    const { tutor_id, tutorado_id, fecha_hora } = validationResult.data;

    try {
        const nuevaCita = await appointmentService.createAppointment(tutor_id, tutorado_id, fecha_hora);
        
        return res.status(201).json({
            success: true,
            message: "Cita programada exitosamente",
            data: nuevaCita
        });

    } catch (error) {
        console.error("Error al crear cita:", error);

        if (error.message === 'TUTOR_NOT_FOUND') {
            return res.status(404).json({ success: false, message: "El tutor especificado no existe o no tiene el rol de Tutor." });
        }
        if (error.message === 'TUTORADO_NOT_FOUND') {
            return res.status(404).json({ success: false, message: "El tutorado especificado no existe o no tiene el rol de Tutorado." });
        }
        if (error.message === 'CAREER_MISMATCH') {
            return res.status(400).json({ success: false, message: "Las carreras del tutor y tutorado no coinciden." });
        }
        if (error.message === 'SCHEDULE_NOT_AVAILABLE') {
            return res.status(400).json({ success: false, message: "El tutor no tiene disponibilidad en la fecha y hora proporcionada." });
        }

        return res.status(500).json({
            success: false,
            message: "Error interno del servidor al crear la cita."
        });
    }
};

module.exports = {
    createAppointment
};
