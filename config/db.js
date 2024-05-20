// config/database.js
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('db_backend_pfe', 'root', '', {
  host: 'localhost',
  dialect: 'mysql'
});

module.exports = sequelize;
