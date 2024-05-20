// models/Employe.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db'); 
const Pointeuse = require('./Pointeuse'); 

const Employe = sequelize.define('Employe', {
  code: {
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: true
  },
  nom: {
    type: DataTypes.STRING,
    allowNull: false
  },
  prenom: {
    type: DataTypes.STRING,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  empriente: {
    type: DataTypes.STRING,
    allowNull: false
  },
  role: {
    type: DataTypes.ENUM('admin', 'user'),
    allowNull: false
  },
  code_pointeuse: {
    type: DataTypes.STRING,
    allowNull: false,
    references: {
      model: Pointeuse,
      key: 'codePointeuse'
    }
  }
});

// Define associations
Employe.belongsTo(Pointeuse, { foreignKey: 'code_pointeuse' });
Pointeuse.hasMany(Employe, { foreignKey: 'code_pointeuse' });

module.exports = Employe;

