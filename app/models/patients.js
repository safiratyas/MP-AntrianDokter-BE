'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Patients extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Patients.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    dateOfBirth: DataTypes.STRING,
    address: DataTypes.STRING,
    genderId: DataTypes.INTEGER,
    image: DataTypes.STRING,
    NIK: DataTypes.INTEGER,
    BPJS: DataTypes.INTEGER,
    phoneNumber: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Patients',
    underscored: true,
  });
  return Patients;
};