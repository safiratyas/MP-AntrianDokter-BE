const queueServices = require('../../services/queues');
const {
  Examinations
} = require('../../models');

module.exports = {
  async createQueue(req, res) {
    try {
      const {
        name,
        patientNIK,
        examinationId
      } = req.body;

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
}