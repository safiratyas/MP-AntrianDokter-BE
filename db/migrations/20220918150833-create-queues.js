'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('queues', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      patientId: {
        type: Sequelize.INTEGER,
        // references: {
        //   model: {
        //     tableName: "patients",
        //   },
        //   key: "id",
        // },
      },
      examinationId: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: "examinations",
          },
          key: "id",
        },
      },
      doctorId: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: "doctors",
          },
          key: "id",
        },
      },
      dateOfVisit: {
        type: Sequelize.STRING
      },
      image: {
        type: Sequelize.STRING
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('queues');
  }
};