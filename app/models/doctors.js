'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Doctors extends Model {
    static associate(models) {
      this.belongsTo(models.Queues, {
        foreignKey: 'doctorId',
        as: 'doctor',
      });
    }
  }
  Doctors.init({
    name: DataTypes.STRING,
    specialist: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Doctors',
    underscored: true,
  });
  return Doctors;
};