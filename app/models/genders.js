'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Genders extends Model {
    static associate(models) {
      this.hasMany(models.Users, {
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