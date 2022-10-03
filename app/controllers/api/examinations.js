const examinationsServices = require('../../services/examinations');

module.exports = {
    async getExaminations(req, res) {
        try {
          const examinations = await examinationsServices.getOne({
            where: {
              id: req.params.id
            },
            attributes: {
              exclude: ['password']
            }
          });
    
          if (!examinations) {
            throw new Error(`Jenis pengecekan dengan ID ${req.params.id} tidak ditemukan!`);
          }
    
          res.status(200).json(examinations);
        } catch (err) {
          res.status(404).json({
            status: 'Failed',
            message: err.message,
          });
        }
      },
    
      async getAllExamination(req, res) {
        const getAll = await examinationsServices.list({
          attributes: {
            exclude: ['password']
          }
        });
    
        res.status(200).json({
          status: "Success",
          data: getAll
        });
      },
      };