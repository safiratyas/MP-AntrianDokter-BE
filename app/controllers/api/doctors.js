const doctorsServices = require('../../services/doctors');

module.exports = {
    async getDoctors(req, res) {
        try {
          const doctors = await doctorsServices.getOne({
            where: {
              id: req.params.id
            },
            attributes: {
              exclude: ['password']
            }
          });
    
          if (!doctors) {
            throw new Error(`Doctors with id ${req.params.id} not found!`);
          }
    
          res.status(200).json(doctors);
        } catch (err) {
          res.status(404).json({
            status: 'Failed',
            message: err.message,
          });
        }
      },
    
      async getAllDoctors(req, res) {
        const getAll = await doctorsServices.list({
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