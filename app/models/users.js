'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    static associate(models) {
      this.belongsTo(models.Genders, {
        foreignKey: 'genderId',
        as: 'gender',
      });
    }
  }
  Users.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    dateOfBirth: DataTypes.STRING,
    address: DataTypes.STRING,
    genderId: DataTypes.INTEGER,
    image: DataTypes.STRING,
    NIK: DataTypes.INTEGER,
    BPJS: DataTypes.INTEGER,
    phoneNumber: DataTypes.INTEGER,
    queueNumber: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Users',
    underscored: true,
  });
  return Users;
};