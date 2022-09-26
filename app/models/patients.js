'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Patients extends Model {
    static associate(models) {
      this.hasMany(models.Queues, {
        foreignKey: 'patientId',
        as: 'patient',
      });
    }
  }
  Patients.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    dateOfBirth: DataTypes.DATEONLY,
    address: DataTypes.STRING,
    gender: DataTypes.STRING,
    NIK: DataTypes.STRING,
    BPJS: DataTypes.STRING,
    phoneNumber: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Patients',
  });
  return Patients;
};