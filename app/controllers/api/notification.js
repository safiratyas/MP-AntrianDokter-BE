const patientServices = require('../../services/patients');
const queueServices = require('../../services/queues');

module.exports = {
    async getAllNotificationUser(req, res) {
      try {
        const getAllQueues = await queueServices.listByCondition({
            where: {
                patientId: req.patient.id,
              },
              include: {
                model: Examinations,
                as: 'examination',
              },
              order: [
                ["id", "DESC"]
              ]
        });
        res.status(200).json({
          status: "success",
          data: getAllQueues
        });
      } catch (err) {
      }
    }
  }