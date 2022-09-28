const queueServices = require('../../services/queues');
const { Examinations } = require('../../models');

module.exports = {
  async createQueue(req, res) {
    try {
      const { name, patientNIK, examinationId } = req.body;

      const booking = await queueServices.create({
        patientId: req.patient.id,
        patientName: req.body.name,
        patientNIK: req.body.patientNIK,
        examinationId: parseInt(examinationId),
        dateOfVisit: new Date(),
        isDone: false
      })

      res.status(201).json(booking);

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
        include: {
          model: Examinations,
          as: 'examination',
          attributes: ['name']
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
    const getAll = await queueServices.list();

    res.status(200).json({
      status: 'Success',
      data: getAll
    });
  },

  async historyAsPatient(req, res) {
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
         return({
          msg: 'Ticketing Belum Dipakai',
          id: history.patientId,
          name: history.patientName,
          NIK: history.patientNIK,
          examination: history.examination.name,
          queue: history.queueNumber,
          time: history.dateOfVisit
         })
        }
   
      })

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
  }
}