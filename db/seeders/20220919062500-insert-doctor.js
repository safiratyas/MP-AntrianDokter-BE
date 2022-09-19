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
        specialists: randSpecialist.specialist,
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