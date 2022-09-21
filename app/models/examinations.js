'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Examinations extends Model {
    static associate(models) {
      this.hasMany(models.Queues, {
        foreignKey: 'examinationId',
        as: 'examination',
      });
    }
  }
  Examinations.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Examinations',
  });
  return Examinations;
};