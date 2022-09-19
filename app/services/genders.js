const gendersRepository = require("../repositories/genders");

module.exports = {
  async list() {
    const genders = await gendersRepository.findAll();
    const gendersCount = await gendersRepository.getTotalGenders();

    return {
      data: genders,
      count: gendersCount,
    };
  },

  get(id) {
    return gendersRepository.find(id);
  },

  getOne(key) {
    return gendersRepository.findOne(key);
  },
};