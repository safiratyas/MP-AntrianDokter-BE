const doctorServices = require('../../services/doctors');

module.exports = {
  async getDoctor(req, res) {
    try {
      const doctor = await doctorServices.getOne({
        where: {
          id: req.params.id
        },
      });

      if (!doctor) {
        throw new Error(`Doctor with id ${req.params.id} not found!`);
      }
      res.status(200).json(doctor)
    } catch (err) {
      res.status(404).json({
        status: 'Failed',
        message: err.message,
      });
    }
  },

  async getAllDoctors(req, res) {
    const getAll = await doctorServices.list();

    res.status(200).json({
      status: 'Success',
      data: getAll
    });
  }
}
