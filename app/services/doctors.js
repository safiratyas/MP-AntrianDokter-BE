const doctorsRepository = require("../repositories/doctors");

module.exports = {
  async list() {
    const Doctors = await doctorsRepository.findAll();
    const DoctorsCount = await doctorsRepository.getTotalDoctors();

    return {
      data: Doctors,
      count: DoctorsCount,
    };
  },

  get(id) {
    return doctorsRepository.find(id);
  },

  getOne(key) {
    return doctorsRepository.findOne(key);
  },
};