const { z } = require('zod');

const createAppointmentSchema = z.object({
    tutor_id: z.number({ required_error: "tutor_id es requerido", invalid_type_error: "tutor_id debe ser numérico" }).int().positive(),
    tutorado_id: z.number({ required_error: "tutorado_id es requerido", invalid_type_error: "tutorado_id debe ser numérico" }).int().positive(),
    // z.coerce.date() can also be used if frontend sends string instead of actual datetime string format
    fecha_hora: z.string({ required_error: "fecha_hora es requerida" }).datetime({ offset: true, message: "fecha_hora debe ser una fecha ISO válida" })
});

module.exports = {
    createAppointmentSchema
};
