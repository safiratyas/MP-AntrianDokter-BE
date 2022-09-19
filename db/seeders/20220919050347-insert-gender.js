'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    const genders = ['Male', 'Female'];

    const insertGenders = genders.map((gender) => ({
      name: gender,
      created_at: new Date(),
      updated_at: new Date(),
    }));

    await queryInterface.bulkInsert('genders', insertGenders, {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('genders', null, {});
  }
};
