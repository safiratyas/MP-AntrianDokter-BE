'use strict'

const polyclinics = [
  "Poli Mata",
  "Poli Anak",
  "Poli Gigi",
  "Poli Kebidanan & Kandungan",
  "Poli Dokter Umum", 
  "Poli Bedah Umum",
  "Poli Penyakit Dalam"
]

module.exports = {
  async up (queryInterface, Sequelize) {
    const poly = polyclinics.map((item) => ({
      name: item,
      createdAt: new Date(),
      updatedAt: new Date(),
    }));

    await queryInterface.bulkInsert('Polyclinics', poly, {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Polyclinics', null, {});
  }
};
