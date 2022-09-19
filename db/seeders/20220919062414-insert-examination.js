'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    const examinations = ['Monthly Checkup', 'Daily Checkup'];

    const insertExaminations = examinations.map((examination) => ({
      name: examination,
      created_at: new Date(),
      updated_at: new Date(),
    }));

    await queryInterface.bulkInsert('examinations', insertExaminations, {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('examinations', null, {});
  }
};
