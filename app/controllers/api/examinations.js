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
  
  async getExaminations(req, res) {
    try {
      const examination = examinationsServices.get({
        where: {
          id
        }
      });
      res.status(200).json(examination);
    } catch (err) {
      res.status(404).json({
        status: 'Failed',
        message: err.message
      })
    }
  }
};
