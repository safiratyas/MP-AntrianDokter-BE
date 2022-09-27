const queueServices = require('../../services/queues');

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
  }
}