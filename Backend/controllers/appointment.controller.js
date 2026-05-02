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

    const admin_id = req.user.id;

    try {
        const nuevaCita = await appointmentService.createAppointment(admin_id, tutor_id, tutorado_id, fecha_hora);
        
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

const updateStatus = async (req, res) => {
    // Verificar rol de Tutor
    if (!req.user || !req.user.rol || req.user.rol.toLowerCase() !== 'tutor') {
        return res.status(403).json({
            success: false,
            message: "Acceso denegado: solo el Tutor puede actualizar el estado de la cita."
        });
    }

    const { id } = req.params;
    const { estado } = req.body;
    const tutor_id = req.user.id;

    if (!estado) {
        return res.status(400).json({ success: false, message: "El campo 'estado' es requerido." });
    }

    try {
        const citaActualizada = await appointmentService.updateAppointmentStatus(id, tutor_id, estado);
        
        return res.status(200).json({
            success: true,
            message: "Estado de cita actualizado exitosamente",
            data: citaActualizada
        });
    } catch (error) {
        console.error("Error al actualizar estado de cita:", error);

        if (error.message === 'INVALID_STATUS') {
            return res.status(400).json({ success: false, message: "Estado inválido. Solo se permite 'aceptada' o 'rechazada'." });
        }
        if (error.message === 'APPOINTMENT_NOT_FOUND') {
            return res.status(404).json({ success: false, message: "La cita especificada no existe." });
        }
        if (error.message === 'UNAUTHORIZED_TUTOR') {
            return res.status(403).json({ success: false, message: "No tienes permiso para modificar esta cita. Solo el tutor asignado puede hacerlo." });
        }

        return res.status(500).json({
            success: false,
            message: "Error interno del servidor al actualizar la cita."
        });
    }
};

module.exports = {
    createAppointment,
    updateStatus
};
