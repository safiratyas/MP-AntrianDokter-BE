'use strict';
const {
  Op
} = require("sequelize");
const bcrypt = require("bcryptjs");
// const timeFormat = require('../../app/utils/timeFormat');

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

module.exports = {
  async up(queryInterface, Sequelize) {
    const password = '12345678';
    const encryptedPassword = bcrypt.hashSync(password, 10);

    const listPatients = [{
        name: 'Reza Fahlevi Alhady',
        gender: 'Pria',
        dateOfBirth: '2002-01-26'
      },
      {
        name: 'Brandon Nicholas Salim',
        gender: 'Pria',
        dateOfBirth: '1999-03-03'
      },
      {
        name: 'Gusti Rayhan Gibayus',
        gender: 'Pria',
        dateOfBirth: '2000-04-15'
      },
      {
        name: 'Vanesha Prescilla',
        gender: 'Wanita',
        dateOfBirth: '1999-09-01'
      },
      {
        name: 'Shania Gracia',
        gender: 'Wanita',
        dateOfBirth: '2002-11-22'
      },
      {
        name: 'Yoriko Angeline Agus Pebrianto',
        gender: 'Wanita',
        dateOfBirth: '2000-09-20'
      },
    ];

    const users = new Array(1);
    for (let i = 0; i < users.length; i++) {
      users[i] = i + 1;
    }

    const insertPatient = [];
    listPatients.forEach((patient) => {
      insertPatient.push(
        ...users.map(() => {
          const splitName = patient.name.split(' ');
          let emailBuild = splitName[0] + splitName[splitName.length - 1];
          const randAlpha = getRandAlphabet();
          const getRandDigits = getRandTwoDigits();
          const rand = Math.floor(Math.random() * 10);

          return ({
            name: patient.name,
            email: `${emailBuild.toLowerCase()}@gmail.com`,
            password: encryptedPassword,
            dateOfBirth: patient.dateOfBirth,
            address: `Jalan Jayakarta Blok ${randAlpha} Nomor ${getRandDigits}.`,
            gender: patient.gender,
            NIK: `31${Math.random().toString().substring(5,15)}`,
            BPJS: `010${Math.random().toString().substring(5,15)}`,
            phoneNumber: `08${Math.random().toString().substring(5,15)}`,
            createdAt: new Date(),
            updatedAt: new Date(),
          });
        })
      )
    });

    await queryInterface.bulkInsert('Patients', insertPatient, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Patients', null, {});
  }
};