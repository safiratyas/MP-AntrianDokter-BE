'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Genders extends Model {
    static associate(models) {
      this.hasMany(models.Patients, {
        foreignKey: 'genderId',
        as: 'gender',
      });
      this.hasMany(models.Admins, {
        foreignKey: 'genderId',
        as: 'gender',
      });
    }
  }
  Genders.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Genders',
    underscored: true,
  });
  return Genders;
};