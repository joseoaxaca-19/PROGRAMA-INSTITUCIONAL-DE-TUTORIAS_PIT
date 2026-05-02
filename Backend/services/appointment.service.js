const { Op } = require('sequelize');
const { Usuario, HorarioTutor, Cita, sequelize } = require('../models/appointment.models');

class AppointmentService {
    async createAppointment(admin_id, tutor_id, tutorado_id, fecha_hora) {
        // Utilizamos una transacción para asegurar la atomicidad
        const t = await sequelize.transaction();

        try {
            // 1. Obtener al tutor y al tutorado para Validar la Regla 2 (Carrera)
            const tutor = await Usuario.findOne({ 
                where: { id: tutor_id, id_rol: 2 }, // Asumiendo rol 2 = Tutor
                transaction: t
            });
            
            const tutorado = await Usuario.findOne({ 
                where: { id: tutorado_id, id_rol: 3 }, // Asumiendo rol 3 = Tutorado
                transaction: t
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
                },
                transaction: t
            });

            if (!horarioDisponible) {
                throw new Error('SCHEDULE_NOT_AVAILABLE');
            }

            // 3. Crear la Cita en estado 'pendiente'
            const nuevaCita = await Cita.create({
                admin_id,
                tutor_id,
                tutorado_id,
                fecha_hora: fechaHoraDeseada,
                estado: 'pendiente'
            }, { transaction: t });

            // Confirmar transacción
            await t.commit();
            return nuevaCita;

        } catch (error) {
            // Revertir transacción en caso de error
            await t.rollback();
            throw error;
        }
    }

    async updateAppointmentStatus(cita_id, tutor_id, nuevo_estado) {
        // Validar estados permitidos
        if (!['aceptada', 'rechazada'].includes(nuevo_estado)) {
            throw new Error('INVALID_STATUS');
        }

        const t = await sequelize.transaction();

        try {
            const cita = await Cita.findByPk(cita_id, { transaction: t });

            if (!cita) {
                throw new Error('APPOINTMENT_NOT_FOUND');
            }

            // Validar que el usuario que actualiza es el tutor asignado
            if (cita.tutor_id !== tutor_id) {
                throw new Error('UNAUTHORIZED_TUTOR');
            }

            cita.estado = nuevo_estado;
            await cita.save({ transaction: t });

            await t.commit();
            return cita;

        } catch (error) {
            await t.rollback();
            throw error;
        }
    }
}

module.exports = new AppointmentService();
