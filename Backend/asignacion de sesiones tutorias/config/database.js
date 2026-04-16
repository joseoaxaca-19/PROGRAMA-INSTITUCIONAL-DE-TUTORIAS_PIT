const { Sequelize } = require('sequelize');
const path = require('path');
require('dotenv').config();

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: path.join(__dirname, '..', process.env.DATABASE_NAME || 'database.sqlite'),
  logging: false
});

module.exports = sequelize;
