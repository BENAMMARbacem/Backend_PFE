const { DataTypes } = require('sequelize');
const sequelize = require('../config/db'); 
const Employe = require('./Employe'); 

const Planning = sequelize.define('Planning', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  id_employe: {
    type: DataTypes.STRING,
    allowNull: false,
    references: {
      model: Employe,
      key: 'code'
    }
  },
  jour: {
    type: DataTypes.STRING,
    allowNull: false
  },
  service: {
    type: DataTypes.STRING,
    allowNull: false
  },
  site: {
    type: DataTypes.STRING,
    allowNull: false
  },
  activite: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

Planning.belongsTo(Employe, { foreignKey: 'id_employe' });

module.exports = Planning;
