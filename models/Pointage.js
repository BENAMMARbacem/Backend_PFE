const { DataTypes } = require('sequelize');
const sequelize = require('../config/db'); 
const Employe = require('./Employe'); 

const Pointage = sequelize.define('Pointage', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  id_emploi: {
    type: DataTypes.STRING,
    allowNull: false,
    references: {
      model: Employe,
      key: 'code'
    }
  },
  date: {
    type: DataTypes.STRING,
    allowNull: false
  },
  entre: {
    type: DataTypes.STRING,
    allowNull: false
  },
  sortie: {
    type: DataTypes.STRING,
    allowNull: false
  },
  pause_de: {
    type: DataTypes.STRING,
    allowNull: false
  },
  pause_a: {
    type: DataTypes.STRING,
    allowNull: false
  },
  nbre_heures_Suppli: {
    type: DataTypes.FLOAT,
    allowNull: false
  }
});

// Define associations
Employe.hasMany(Pointage, { foreignKey: 'id_emploi' });
Pointage.belongsTo(Employe, { foreignKey: 'id_emploi' });

module.exports = Pointage;
