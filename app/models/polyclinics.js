'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Polyclinics extends Model {
    static associate(models) {
      this.hasMany(models.Queues, {
        foreignKey: 'polyId',
        as: 'poly'
      });
      this.hasMany(models.Doctors, {
        foreignKey: 'specialistId',
        as: 'specialist'
      });
    }
  }
  Polyclinics.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Polyclinics',
  });
  return Polyclinics;
};