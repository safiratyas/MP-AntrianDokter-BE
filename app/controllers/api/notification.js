const queueServices = require('../../services/queues');
const timeFormat = require('../../utils/timeFormat');
const {
  Examinations
} = require('../../models');
const {
  Op
} = require("sequelize");

module.exports = {
  async getAllNotification(req, res) {
    try {
      const getBooking = await queueServices.list({
        where: {
          isDone: {
            [Op.or]: [true, false]
          }
        },
        include: {
          model: Examinations,
          as: 'examination',
        },
        order: [
          ["id", "DESC"]
        ]
      });

      const result = getBooking.data.map((notification) => {
        if (notification.isDone === true) {
          return ({
            msg: 'Tiket Telah Selesai Digunakan',
            id: notification.patientId,
            bookingId: notification.id,
            name: notification.patientName,
            NIK: notification.patientNIK,
            examination: notification.examination.name,
            queue: notification.queueNumber,
            time: timeFormat(notification.dateOfVisit)
          })
        } else if (notification.isDone === false) {
          return ({
            msg: 'Tiket Berhasil Diterbitkan',
            id: notification.patientId,
            bookingId: notification.id,
            name: notification.patientName,
            NIK: notification.patientNIK,
            examination: notification.examination.name,
            queue: notification.queueNumber,
            time: timeFormat(notification.dateOfVisit)
          })
        }
      });

      res.status(200).json({
        status: "Success",
        result
      });
    } catch (err) {
      res.status(400).json({
        status: "Failed",
        message: err.message
      });
    }
  },
};