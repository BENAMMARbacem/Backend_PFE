
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Pointeuse = sequelize.define('Pointeuse', {
  codePointeuse: {
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: true
  },
  libelle: {
    type: DataTypes.STRING,
    allowNull: false
  },
  ip: {
    type: DataTypes.STRING,
    allowNull: false
  },
  port: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  site: {
    type: DataTypes.STRING,
    allowNull: false
  },
  filiale: {
    type: DataTypes.STRING,
    allowNull: false
  },
  societe: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

module.exports = Pointeuse;
