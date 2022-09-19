'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    const genders = ['Male', 'Female'];

    const insertGenders = genders.map((gender) => ({
      name: gender,
      createdAt: new Date(),
      updatedAt: new Date(),
    }));

    await queryInterface.bulkInsert('genders', insertGenders, {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('genders', null, {});
  }
};
