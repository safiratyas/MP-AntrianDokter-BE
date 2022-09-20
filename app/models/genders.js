'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Genders extends Model {
    static associate(models) {
      // define association here
    }
  }
  Genders.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Genders',
  });
  return Genders;
};