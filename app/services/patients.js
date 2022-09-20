const patientsRepository = require('../repositories/patients');

module.exports = {
  create(requestBody) {
    return patientsRepository.create(requestBody);
  },

  update(id, requestBody) {
    return patientsRepository.update(id, requestBody);
  },

  delete(id) {
    return patientsRepository.delete(id);
  },

  async listByCondition(condition) {
    try {
      const patients = await patientsRepository.findAll(condition);
      const patientsCount = await patientsRepository.getTotalPatients();

      return {
        data: patients,
        count: patientsCount,
      };
    } catch (err) {
      throw err;
    }
  },

  get(id) {
    return patientsRepository.find(id);
  },

  getOne(key) {
    return patientsRepository.findOne(key);
  },
};