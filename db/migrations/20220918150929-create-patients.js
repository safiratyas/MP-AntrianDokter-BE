'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('patients', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING
      },
      dateOfBirth: {
        type: Sequelize.STRING
      },
      address: {
        type: Sequelize.STRING
      },
      genderId: {
        type: Sequelize.INTEGER,
        // references: {
        //   model: {
        //     tableName: "genders",
        //   },
        //   key: "id",
        // },
      },
      image: {
        type: Sequelize.STRING
      },
      NIK: {
        type: Sequelize.INTEGER
      },
      BPJS: {
        type: Sequelize.INTEGER
      },
      phoneNumber: {
        type: Sequelize.INTEGER
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('patients');
  }
};