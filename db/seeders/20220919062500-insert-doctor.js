'use strict';

const { Op } = require("sequelize");

const names = [
  'Abdul Hafiz',
  'Devara Gandanny Shoeria',
  'Fadilah Akbar',
  'Krisna Pramulya Putra',
  'Sadam Wahid Yotama',
  'Muhammad Aditya'
];

module.exports = {
  async up(queryInterface, Sequelize) {
    const doctors = names.map((name) => {
      return ({
        name,
        created_at: new Date(),
        updated_at: new Date(),
      })
    })
    await queryInterface.bulkInsert('doctors', doctors, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('doctors', {
      name: {
        [Op.in]: names
      }
    }, {});
  }
};