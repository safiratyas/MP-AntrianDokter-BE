'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Queues extends Model {
    static associate(models) {
      this.hasMany(models.Patients, {
        foreignKey: 'patientId', 
        as: 'patient',
      });
      this.hasMany(models.Examinations, {
        foreignKey: 'examinationId',
        as: 'examination',
      });
      this.hasMany(models.Doctors, {
        foreignKey: 'doctorId',
        as: 'doctor',
      });
    }
  }
  Queues.init({
    patientId: DataTypes.INTEGER,
    examinationId: DataTypes.INTEGER,
    doctorId: DataTypes.INTEGER,
    dateOfVisit: DataTypes.STRING,
    image: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Queues',
    underscored: true,
  });
  return Queues;
};