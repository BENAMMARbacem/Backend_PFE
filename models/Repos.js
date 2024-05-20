const { DataTypes } = require('sequelize');
const sequelize = require('../config/db'); 

const Repos = sequelize.define('Repos', {
  code: {
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: true
  },
  designation: {
    type: DataTypes.STRING,
    allowNull: false
  },
  couleur: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

module.exports = Repos;
