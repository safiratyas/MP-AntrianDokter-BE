'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Queues', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      patientId: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: "Patients",
          },
          key: "id",
        },
      },
      patientName: {
        type: Sequelize.STRING
      },
      patientNIK: {
        type: Sequelize.STRING
      },
      examinationId: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: "Examinations",
          },
          key: "id",
        },
      },
      dateOfVisit: {
        type: Sequelize.DATEONLY
      },
      queueNumber: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: false,
      },
      isDone: {
        type: Sequelize.BOOLEAN
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Queues');
  }
};