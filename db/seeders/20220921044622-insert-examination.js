'use strict';

const examinations = [
  "BPJS",
  "Non BPJS"
];

module.exports = {
  async up (queryInterface, Sequelize) {
    const examination = examinations.map((ex) => ({
      name: ex,
      createdAt: new Date(),
      updatedAt: new Date(),
    }));

    await queryInterface.bulkInsert('Examinations', examination, {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Examinations', null, {});
  }
};
