'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Admins extends Model {
    static associate(models) {
      this.belongsTo(models.Genders, {
        foreignKey: 'genderId',
        as: 'gender',
      });
    }
  }
  Admins.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    image: DataTypes.STRING,
    phoneNumber: DataTypes.INTEGER,
    genderId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Admins',
    underscored: true,
  });
  return Admins;
};