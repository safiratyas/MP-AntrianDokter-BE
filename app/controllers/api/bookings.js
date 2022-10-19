const queueServices = require('../../services/queues');
const timeFormat = require('../../utils/timeFormat');
const {
  Examinations
} = require('../../models');
const {
  Op
} = require("sequelize");

module.exports = {
  async historyBookings(req, res) {
    try {
      const historyPatient = await queueServices.list({
        where: {
          patientId: req.patient.id,
        },
        include: {
          model: Examinations,
          as: 'examination',
        },
        order: [
          ['id', 'DESC']
        ]
      });

      const result = historyPatient.map((history) => {
        if (history.isDone === true) {
          return ({
            msg: 'Tiket Sudah Dipakai',
            id: history.patientId,
            name: history.patientName,
            NIK: history.patientNIK,
            examination: history.examination.name,
            queue: history.queueNumber,
            time: timeFormat(history.dateOfVisit)
          })
        } else if (history.isDone === false) {
          return ({
            msg: 'Tiket Belum Dipakai',
            id: history.patientId,
            name: history.patientName,
            NIK: history.patientNIK,
            examination: history.examination.name,
            queue: history.queueNumber,
            time: timeFormat(history.dateOfVisit)
          })
        }
      });

      const id = req.params.id;
      const compareId = id.toString() === req.patient.id.toString();

      if (!compareId) {
        res.status(401).json({
          status: 'Failed',
          message: 'Tidak bisa melihat riwayat tiket orang lain!'
        });
        return;
      }

      res.status(200).json({
        message: 'Success',
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
      const {
        isDone
      } = req.body;

      const update = await queueServices.update(req.params.id, {
        isDone
      });

      res.status(200).json({
        status: 'OK',
        message: `Pasien dengan ID tiket ${req.params.id} telah selesai.`,
      });
    } catch (err) {
      res.status(422).json({
        error: err.name,
        message: err.message
      })
    }
  },

  async getCurrentQueue(req, res) {
    try {
      const getBooking = await queueServices.list({
        where: {
          isDone: {
            [Op.eq]: false
          }
        },
        order: [
          ['id', 'ASC']
        ]
      });

      const count = getBooking.count
      const result = getBooking.data.map((queue) => {
        return ({
          name: queue.patientName,
          NIK: queue.patientNIK,
          queue: queue.queueNumber,
          count
        });
      });

      res.status(200).json({
        status: "Success",
        result,
      });
    } catch (err) {
      res.status(400).json({
        status: "Failed",
        message: err.message
      });
    }
  },
}