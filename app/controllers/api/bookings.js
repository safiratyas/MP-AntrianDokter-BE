const queueServices = require('../../services/queues');

module.exports = {
  async historyBookings(req, res) {
    try {
      const historyPatient = await queueServices.listByCondition({
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

      const result = historyPatient.map((history) => {
        if (history.isDone === true) {
          return ({
            msg: 'Ticketing Sudah Dipakai',
            id: history.patientId,
            name: history.patientName,
            NIK: history.patientNIK,
            examination: history.examination.name,
            queue: history.queueNumber,
            time: history.dateOfVisit
          })
        } else if (history.isDone === false) {
          return ({
            msg: 'Ticketing Belum Dipakai',
            id: history.patientId,
            name: history.patientName,
            NIK: history.patientNIK,
            examination: history.examination.name,
            queue: history.queueNumber,
            time: history.dateOfVisit
          })
        }
      });

      res.status(200).json({
        message: "Success",
        result,
      });
    } catch (err) {
      res.status(422).json({
        error: {
          name: err.name,
          message: err.message,
        }
      });
    }
  },

  async updateBooking(req, res) {
    try {
      const {
        isDone
      } = req.body;

      await queueServices.update(req.params.id, {
        isDone,
      });

      if (!isDone) {
        await queueServices.update(req.params.id, {
          isDone: false
        })
      }

      res.status(201).json({
        status: "Success",
        message: `Booking with id ${req.params.id} has been done.`,
      });

    } catch (err) {
      res.status(422).json({
        error: {
          name: err.name,
          message: err.message,
        }
      });
    }
  }
}