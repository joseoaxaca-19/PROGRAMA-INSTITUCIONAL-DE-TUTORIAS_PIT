const { DataTypes } = require('sequelize');
const sequelize = require('../db/sequelize');

// Modelo Carrera
const Carrera = sequelize.define('Carrera', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    nombre: { type: DataTypes.STRING, allowNull: false },
    id_division: { type: DataTypes.INTEGER, allowNull: false }
}, { tableName: 'carreras', timestamps: false });

// Modelo Usuario
const Usuario = sequelize.define('Usuario', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    nombre: { type: DataTypes.STRING, allowNull: false },
    apellidos: { type: DataTypes.STRING, allowNull: false },
    id_carrera: { type: DataTypes.INTEGER, allowNull: false },
    id_rol: { type: DataTypes.INTEGER, allowNull: false }, // 1 = Admin, 2 = Tutor, 3 = Tutorado asumiendo
    contrasena: { type: DataTypes.STRING, allowNull: false }
}, { tableName: 'usuarios', timestamps: false });

// Modelo HorariosTutor
const HorarioTutor = sequelize.define('HorarioTutor', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    tutor_id: { type: DataTypes.INTEGER, allowNull: false },
    fecha_hora_inicio: { type: DataTypes.DATE, allowNull: false },
    fecha_hora_fin: { type: DataTypes.DATE, allowNull: false },
    disponible: { type: DataTypes.BOOLEAN, defaultValue: true }
}, { tableName: 'horarios_tutor', timestamps: false });

// Modelo Cita
const Cita = sequelize.define('Cita', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    tutor_id: { type: DataTypes.INTEGER, allowNull: false },
    tutorado_id: { type: DataTypes.INTEGER, allowNull: false },
    fecha_hora: { type: DataTypes.DATE, allowNull: false },
    estado: { 
        type: DataTypes.ENUM('pendiente', 'aceptada', 'rechazada'), 
        defaultValue: 'pendiente',
        allowNull: false
    }
}, { tableName: 'citas', timestamps: true }); // Timestamps útiles para createdAt \ updatedAt

// Relaciones
Usuario.belongsTo(Carrera, { foreignKey: 'id_carrera', as: 'carrera' });
Carrera.hasMany(Usuario, { foreignKey: 'id_carrera', as: 'usuarios' });

HorarioTutor.belongsTo(Usuario, { foreignKey: 'tutor_id', as: 'tutor' });
Usuario.hasMany(HorarioTutor, { foreignKey: 'tutor_id', as: 'horarios' });

Cita.belongsTo(Usuario, { foreignKey: 'tutor_id', as: 'tutor' });
Cita.belongsTo(Usuario, { foreignKey: 'tutorado_id', as: 'tutorado' });

module.exports = {
    Carrera,
    Usuario,
    HorarioTutor,
    Cita,
    sequelize
};
