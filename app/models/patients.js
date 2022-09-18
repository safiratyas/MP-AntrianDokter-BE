'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Patients extends Model {
    static associate(models) {
      this.belongsTo(models.Genders, {
        foreignKey: 'genderId',
        as: 'gender',
      });
      this.belongsTo(models.Queues, {
        foreignKey: 'patientId',
        as: 'patient'
      })
    }
  }
  Patients.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    dateOfBirth: DataTypes.STRING,
    address: DataTypes.STRING,
    genderId: DataTypes.INTEGER,
    image: DataTypes.STRING,
    NIK: DataTypes.INTEGER,
    BPJS: DataTypes.INTEGER,
    phoneNumber: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Patients',
    underscored: true,
  });
  return Patients;
};