const examinationsRepository = require("../repositories/examination");

module.exports = {
  async list() {
    const examinations = await examinationsRepository.findAll();
    const examinationsCount = await examinationsRepository.getTotalExaminations();

    return {
      data: examinations,
      count: examinationsCount,
    };
  },

  get(id) {
    return examinationsRepository.find(id);
  },

  getOne(key) {
    return examinationsRepository.findOne(key);
  },
};