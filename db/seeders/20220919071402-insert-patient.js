'use strict';

const { Op } = require("sequelize");
const bcrypt = require("bcryptjs");
const data = require('../../data/months-detailed.json');

const names = [
  'Abdul Hafiz',
  'Devara Gandanny Shoeria',
  'Fadilah Akbar',
  'Krisna Pramulya Putra',
  'Sadam Wahid Yotama',
  'Muhammad Aditya'
];

function getRandAlphabet() {
  const getRandInt = Math.floor(Math.random() * 26);
  return String.fromCharCode((getRandInt + 65).toString());
}

function getRandTwoDigits() {
  let getRandInt = Math.random().toString().substring(6, 8);
  if (getRandInt[0] === '0' && getRandInt[1] !== 0) {
    getRandInt = getRandInt[1];
  } else if (getRandInt[0] === '0' && getRandInt[1] === '0') {
    getRandInt = '1';
  }
  return getRandInt;
}

function getRandMonth() {
  const months = [
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember"
  ];

  const getMonth = months[Math.floor(Math.random() * months.length)];

  const find = data.find((element) =>
    element.month === getMonth
  );

  return find;
}

module.exports = {
  async up (queryInterface, Sequelize) {
    const password = '12345678';
    const encryptedPassword = bcrypt.hashSync(password, 10);

    const patients = names.map((name) => {
      const splitName = name.split(' ');
      let emailBuild = splitName[0] + splitName[splitName.length - 1];
      const randAlpha = getRandAlphabet();
      const getRandDigits = getRandTwoDigits();
      const randMonth = getRandMonth();
      const rand = Math.floor(Math.random() * 10);

      return({
        name,
        email: `${emailBuild.toLowerCase()}@gmail.com`,
        password: encryptedPassword,
        date0fBirth: `${rand} ${randMonth.id}, 1995`,
        address: `Jalan Jayakarta Blok ${randAlpha} Nomor ${getRandDigits}.`,
        genderId: 1,
        image: `https://randomuser.me/api/portraits/lego/${rand}.jpg`,
        NIK: `3174${Math.random().toString().substring(5, 10)}`,
        BPJS: `000${Math.random().toString().substring(5, 10)}`,
        phoneNumber: `08${Math.random().toString().substring(5, 10)}`,
        created_at: new Date(),
        updated_at: new Date(),
      });
    });

    await queryInterface.bulkInsert('patients', patients, {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('patients', {
      name: {
        [Op.in]: names
      }
    }, {});
  }
};
