const examinationsServices = require('../../services/examinations');

module.exports = {
  async getAllExamination(req, res) {
    const getAll = await examinationsServices.list({
      attributes: {
        exclude: ['password']
      }
    });

    res.status(200).json({
      status: "success",
      data: getAll
    });
  },
};
