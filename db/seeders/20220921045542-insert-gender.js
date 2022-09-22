'use strict';

const genders = [
  "Pria",
  "Wanita"
];

module.exports = {
  async up (queryInterface, Sequelize) {
    const gender = genders.map((gen) => ({
      name: gen,
      createdAt: new Date(),
      updatedAt: new Date(),
    }));

    await queryInterface.bulkInsert('Genders', gender, {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Genders', null, {});
  }
};
