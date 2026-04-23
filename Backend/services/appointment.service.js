const { Op } = require('sequelize');
const { Usuario, HorarioTutor, Cita } = require('../models/appointment.models');

class AppointmentService {
    async createAppointment(tutor_id, tutorado_id, fecha_hora) {
        // 1. Obtener al tutor y al tutorado para Validar la Regla 2 (Carrera)
        const tutor = await Usuario.findOne({ 
            where: { id: tutor_id, id_rol: 2 } // Asumiendo rol 2 = Tutor
        });
        
        const tutorado = await Usuario.findOne({ 
            where: { id: tutorado_id, id_rol: 3 } // Asumiendo rol 3 = Tutorado
        });

        if (!tutor) {
            throw new Error('TUTOR_NOT_FOUND');
        }

        if (!tutorado) {
            throw new Error('TUTORADO_NOT_FOUND');
        }

        // Validación de Carrera (Regla de Negocio 2)
        if (tutor.id_carrera !== tutorado.id_carrera) {
            throw new Error('CAREER_MISMATCH');
        }

        // 2. Validación de Horario (Regla de Negocio 1)
        const fechaHoraDeseada = new Date(fecha_hora);

        const horarioDisponible = await HorarioTutor.findOne({
            where: {
                tutor_id: tutor_id,
                disponible: true,
                fecha_hora_inicio: { [Op.lte]: fechaHoraDeseada },
                fecha_hora_fin: { [Op.gte]: fechaHoraDeseada }
            }
        });

        if (!horarioDisponible) {
            throw new Error('SCHEDULE_NOT_AVAILABLE');
        }

        // 3. Crear la Cita en estado 'pendiente'
        const nuevaCita = await Cita.create({
            tutor_id,
            tutorado_id,
            fecha_hora: fechaHoraDeseada,
            estado: 'pendiente'
        });

        // Opcional: Marcar el horario como ocupado dependiendo de las reglas del negocio, 
        // por ahora lo dejamos disponible para citas múltiples en el mismo rango,
        // o si es cita única: await horarioDisponible.update({ disponible: false });

        return nuevaCita;
    }
}

module.exports = new AppointmentService();
