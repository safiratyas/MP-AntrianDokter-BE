const { Patients } = require('../models');

module.exports = {
  create(inputData) {
    return Patients.create(inputData);
  },

  update(id, updateData) {
    return Patients.update(updateData, {
      where: {
        id
      }
    });
  },

  delete(id) {
    return Patients.destroy({
      where: {
        id
      }
    });
  },

  find(id) {
    return Patients.findByPk(id);
  },

  findAll(condition) {
    return Patients.findAll(condition);
  },

  findOne(key) {
    return Patients.findOne(key);
  },

  getTotalPatients() {
    return Patients.count();
  },
};