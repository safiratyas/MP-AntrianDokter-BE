'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Queues extends Model {
    static associate(models) {
      this.belongsTo(models.Doctors, {
        foreignKey: 'doctorId',
        as: 'doctor',
      });
      this.belongsTo(models.Examinations, {
        foreignKey: 'examinationId',
        as: 'examination',
      });
      this.belongsTo(models.Patients, {
        foreignKey: 'patientId',
        as: 'patient',
      });
      this.belongsTo(models.Polyclinics, {
        foreignKey: 'polyId',
        as: 'poly',
      });
    }
  }
  Queues.init({
    patientId: DataTypes.INTEGER,
    patientName: DataTypes.STRING,
    polyId: DataTypes.INTEGER,
    examinationId: DataTypes.INTEGER,
    doctorId: DataTypes.INTEGER,
    dateOfVisit: DataTypes.DATEONLY,
    queueNumber: DataTypes.INTEGER,
    isDone: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Queues',
  });
  return Queues;
};