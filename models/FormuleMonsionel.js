const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const FormuleMonsionel = sequelize.define('FormuleMonsionel', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  nbre_heures_max: {
    type: DataTypes.STRING,
    allowNull: false
  },
  nbre_heures_min: {
    type: DataTypes.STRING,
    allowNull: false
  },
  heure_supp: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

module.exports = FormuleMonsionel;
