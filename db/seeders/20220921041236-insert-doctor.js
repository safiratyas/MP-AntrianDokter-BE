'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    const polyDoctors = [{
        name: 'Abdul Hafiz',
        specialist: 'Poli Bedah Umum',
        specialistId: 6
      },
      {
        name: 'Lebrati Kabnani',
        specialist: 'Poli Bedah Umum',
        specialistId: 6
      },
      {
        name: 'Devara Gandanny Shoeria',
        specialist: 'Poli Gigi',
        specialistId: 3
      },
      {
        name: 'Safira Tyas Wandita',
        specialist: 'Poli Gigi',
        specialistId: 3
      },
      {
        name: 'Fadilah Akbar',
        specialist: 'Poli Kebidanan & Kandungan',
        specialistId: 4
      },
      {
        name: 'Siti Haryati',
        specialist: 'Poli Kebidanan & Kandungan',
        specialistId: 4
      },
      {
        name: 'Krisna Pramulya Putra',
        specialist: 'Poli Mata',
        specialistId: 1
      },
      {
        name: 'Sadam Wahid Yotama',
        specialist: 'Poli Mata',
        specialistId: 1
      },
      {
        name: 'Zalsabila Tsania Widiatno',
        specialist: 'Poli Penyakit Dalam',
        specialistId: 7
      },
      {
        name: 'Safia Sukma Adila',
        specialist: 'Poli Anak',
        specialistId: 2
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
            specialistId: polyDoctor.specialistId,
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