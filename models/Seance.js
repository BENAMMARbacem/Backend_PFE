const { DataTypes } = require('sequelize');
const sequelize = require('../config/db'); 

const Seance = sequelize.define('Seance', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  type_seance: {
    type: DataTypes.ENUM('double_seance', 'seance_unique', 'ramadan'),
    allowNull: false
  }
});

module.exports = Seance;
