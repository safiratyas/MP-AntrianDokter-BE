'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Queues extends Model {
    static associate(models) {
      this.belongsTo(models.Examinations, {
        foreignKey: 'examinationId',
        as: 'examination',
      });
      this.belongsTo(models.Patients, {
        foreignKey: 'patientId',
        as: 'patient',
      });
    }
  }
  Queues.init({
    patientId: DataTypes.INTEGER,
    patientName: DataTypes.STRING,
    patientNIK: DataTypes.STRING,
    examinationId: DataTypes.INTEGER,
    dateOfVisit: DataTypes.DATEONLY,
    queueNumber: DataTypes.INTEGER,
    isDone: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Queues',
  });
  return Queues;
};