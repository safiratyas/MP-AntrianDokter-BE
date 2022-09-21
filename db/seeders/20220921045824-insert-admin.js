'use strict';
const {
  Op
} = require("sequelize");
const bcrypt = require("bcryptjs");

module.exports = {
  async up(queryInterface, Sequelize) {
    const password = '12345678';
    const encryptedPassword = bcrypt.hashSync(password, 10);

    const listAdmins = [{
        name: 'Iqbaal Dhiafakhri Ramadhan',
        gender: 'Pria'
      },
      {
        name: 'Angga Aldi Yunanda',
        gender: 'Pria'
      },
      {
        name: 'Irham Nuran Harir',
        gender: 'Pria'
      },
      {
        name: 'Muhammad Arfiza Shahab',
        gender: 'Pria'
      },
      {
        name: 'Aghniny Haque',
        gender: 'Wanita'
      },
      {
        name: 'Rachel Amanda Aurora',
        gender: 'Wanita'
      },
    ];

    const users = new Array(1);
    for (let i = 0; i < users.length; i++) {
      users[i] = i + 1;
    }

    const insertAdmin = [];
    listAdmins.forEach((admin) => {
      insertAdmin.push(
        ...users.map(() => {
          const splitName = admin.name.split(' ');
          let emailBuild = splitName[0] + splitName[splitName.length - 1];
          const rand = Math.floor(Math.random() * 10);

          return ({
            name: admin.name,
            email: `${emailBuild.toLowerCase()}@gmail.com`,
            password: encryptedPassword,
            image: `https://randomuser.me/api/portraits/lego/${rand}.jpg`,
            phoneNumber: `08${Math.random().toString().substring(5,15)}`,
            gender: admin.gender,
            createdAt: new Date(),
            updatedAt: new Date(),
          });
        })
      )
    });

    await queryInterface.bulkInsert('Admins', insertAdmin, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Admins', null, {});
  }
};