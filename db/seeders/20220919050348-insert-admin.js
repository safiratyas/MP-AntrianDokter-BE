'use strict';

const names = [
  'Magthilda Saoda',
  'Safia Sukma Adila',
  'Safira Tyas Wandita',
  'Siti Haryati',
  'Zalsabila Tsania Widiatno'
];

const genders = [
  'Male',
  'Female'
];

module.exports = {
  async up (queryInterface, Sequelize) {
    const password = '12345678';
    const encryptedPassword = bcrypt.hashSync(password, 10);

    const admins = names.map((name) => {
      const splitName = name.split(' ');
      let emailBuild = splitName[0] + splitName[splitName.length - 1];
      const rand = Math.floor(Math.random() * 10);

      return({
        name,
        email: `${emailBuild.toLowerCase()}@gmail.com`,
        encryptedPassword,
        image: `https://randomuser.me/api/portraits/lego/${rand}.jpg`,
        phoneNumber: `08${Math.random().toString().substring(5, 15)}`,
        genderId: genders[1],
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    });

    await queryInterface.bulkInsert('admins', admins, {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('admins', {
      name: {
        [Op.in]: names
      }
    }, {});
  }
};
