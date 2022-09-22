'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Doctors extends Model {
    static associate(models) {
      this.hasMany(models.Queues, {
        foreignKey: 'doctorId',
        as: 'doctor',
      });
      this.belongsTo(models.Polyclinics, {
        foreignKey: 'specialistId',
        as: 'specialist'
      });
    }
  }
  Doctors.init({
    name: DataTypes.STRING,
    specialistId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Doctors',
  });
  return Doctors;
};