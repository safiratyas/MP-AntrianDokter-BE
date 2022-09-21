'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    const polyDoctors = [{
        name: 'Abdul Hafiz',
        specialist: 'Poli Bedah Umum'
      },
      {
        name: 'Lebrati Kabnani',
        specialist: 'Poli Bedah Umum'
      },
      {
        name: 'Devara Gandanny Shoeria',
        specialist: 'Poli Gigi'
      },
      {
        name: 'Safira Tyas Wandita',
        specialist: 'Poli Gigi'
      },
      {
        name: 'Fadilah Akbar',
        specialist: 'Poli Kebidanan & Kandungan'
      },
      {
        name: 'Siti Haryati',
        specialist: 'Poli Kebidanan & Kandungan'
      },
      {
        name: 'Krisna Pramulya Putra',
        specialist: 'Poli Mata'
      },
      {
        name: 'Sadam Wahid Yotama',
        specialist: 'Poli Mata'
      },
      {
        name: 'Zalsabila Tsania Widiatno',
        specialist: 'Poli Penyakit Dalam'
      },
      {
        name: 'Safia Sukma Adila',
        specialist: 'Poli Anak'
      },
    ];

    const users = new Array(1);
    for (let i = 0; i < users.length; i++) {
      users[i] = i + 1;
    }

    const insertDoctor = [];
    polyDoctors.forEach((polyDoctor) => {
      insertDoctor.push(
        ...users.map(() => {
          return ({
            name: polyDoctor.name,
            specialist: polyDoctor.specialist,
            createdAt: new Date(),
            updatedAt: new Date(),
          })
        })
      )
    })

    await queryInterface.bulkInsert('Doctors', insertDoctor, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Doctors', null, {});
  }
};