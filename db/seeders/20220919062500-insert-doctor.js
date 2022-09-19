'use strict';

const names = [
  'Abdul Hafiz',
  'Devara Gandanny Shoeria',
  'Fadilah Akbar',
  'Krisna Pramulya Putra',
  'Sadam Wahid Yotama',
  'Muhammad Aditya'
];

function getRandSpecialist() {
  const specialists = [
    'Dokter Umum',
    'Dokter Gigi',
    'Dokter Kandungan & Kebidanan',
  ];
  const getSpecialist = specialists[Math.floor(Math.random() * specialists.length)];

  const find = data.find((element) =>
    element.specialist === getSpecialist
  );

  return find;
}

module.exports = {
  async up(queryInterface, Sequelize) {
    const doctors = names.map((name) => {
      const randSpecialist = getRandSpecialist();
      return ({
        name,
        specialists: getRandSpecialist.specialist,
        created_at: new Date(),
        updated_at: new Date(),
      })
    })
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};