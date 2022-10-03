const queueServices = require('../../services/queues');

const {
  Examinations
} = require('../../models');

module.exports = {
  async historyBookings(req, res) {
    console.log(req.body);
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

      const id = req.params.id;
      const compareId = id.toString() === req.patient.id.toString();

      if (!compareId) {
        res.status(401).json({
          status: 'Failed',
          message: 'Cannot see other people booking history'
        });
        return;
      }

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

  async updateBookingPatient(req, res) {
    try {
      const { isDone } = req.body;
      const update = await queueServices.update(req.params.bookingId, {
        isDone
      });

      res.status(200).json({
        status: 'OK',
        message: `Patient with bookingId ${req.params.bookingId} has done for checking.`,
      });
    } catch (err) {
      res.status(422).json({
        error: err.name,
        message: err.message
      })
    }
  },
}