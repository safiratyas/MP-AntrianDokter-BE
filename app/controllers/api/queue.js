const queueServices = require('../../services/queues');

module.exports = {
  async createQueue(req, res) {
    try {
      const { name, patientNIK, examinationId } = req.body;
      // const dateNow = new Date(date);
      // const numberOfBookings = await queueServices.list();
      // var count = 0;

      // for (let i = 0; i < numberOfBookings.length; i++) {
      //   console.log(numberOfBookings.dateOfVisit, dateNow);
      //   if (numberOfBookings.dateOfVisit.getDay() == dateNow.getDay()) {
      //     count++
      //   }
      // }
      
      // if (count >= 3) {
      //   res.status(422).json({
      //     status: 'Failed',
      //     message: 'Full Booked'
      //   });
      //   return;
      // }

      const booking = await queueServices.create({
        patientId: req.patient.id,
        patientName: req.body.name,
        patientNIK: req.body.patientNIK,
        examinationId: parseInt(examinationId),
        dateOfVisit: new Date(),
        isDone: false
      })

      res.status(201).json({
        Name: booking.patientName,
        NIK: booking.patientNIK,
        Date: booking.dateOfVisit,
        queueNumber: booking.queueNumber,
        examinationId: booking.examinationId,
        isDone: false,
      })

    } catch (err) {
      res.status(400).json({
        error: err.name,
        message: err.message
      });
    }
  },

  async deleteAllQueue(req, res) {
    const deleteQueue = await queueServices.deleteAll();
    res.status(200).json({
      status: 'Success',
      message: res.message 
    })
  },

  async getQueue(req, res) {
    try {
      const queue = await queueServices.getOne({
        where: {
          id: req.params.id
        },
        attributes: {
          exclude: []
        }
      });

      if (!queue) {
        throw new Error(`Queue with id ${req.params.id} not found!`);
      }

      res.status(200).json(queue);
    } catch (err) {
      res.status(404).json({
        status: 'Failed',
        message: err.message,
      });
    }
  },

  async getAllQueues(req, res) {
    const getAll = await queueServices.list({
      attributes: {
        exclude: []
      }
    });

    res.status(200).json({
      status: 'Success',
      data: getAll
    });
  },
}