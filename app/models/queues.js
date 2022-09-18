'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Queues extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
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