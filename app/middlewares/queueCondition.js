const queueServices = require('../services/queues');

module.exports = {
  async checkCondition(req, res, next) {
    const {
      name,
      patientNIK,
      examinationId
    } = req.body;

    if (!name) {
      res.status(400).json({
        status: 'Failed',
        message: 'Nama tidak boleh kosong!'
      });
      return;
    }

    if (!patientNIK) {
      res.status(400).json({
        status: 'Failed',
        message: 'NIK tidak boleh kosong!'
      });
      return;
    }

    const uniqueNIK = await queueServices.getOne({
      where: {
        patientNIK
      }
    });

    if (uniqueNIK) {
      res.status(409).json({
        status: 'Failed',
        message: 'NIK sudah terdaftar!'
      });
      return;
    }

    if (!examinationId) {
      res.status(400).json({
        status: 'Failed',
        message: 'Harus pilih salah satu metode!'
      });
      return;
    }

    next();
  }
}