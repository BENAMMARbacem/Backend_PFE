const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Employe = require('./Employe');

const Conge = sequelize.define('Conge', {
  id: {
    type: DataTypes.INTEGER,
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
  date_debut: {
    type: DataTypes.DATE,
    allowNull: false
  },
  date_fin: {
    type: DataTypes.DATE,
    allowNull: false
  }
});

Conge.belongsTo(Employe, { foreignKey: 'id_employe' });
Employe.hasMany(Conge, { foreignKey: 'id_employe' });

module.exports = Conge;
