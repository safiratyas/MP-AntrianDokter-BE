const patientServices = require('../../services/patients');
const { Genders } = require('../../models');

const {
  checkPassword,
  createToken,
  hashPassword
} = require('../../plugin');

module.exports = {
  async register(req, res) {
    try {
      const password = req.body.password;
      const encryptedPassword = await hashPassword(password, 10);

      const patient = await patientServices.create({
        name: req.body.name,
        email: req.body.email.toLowerCase(),
        password: encryptedPassword,
        dateOfBirth: req.body.dateOfBirth,
        address: req.body.address,
        gender: req.body.gender,
        image: null,
        NIK: req.body.NIK,
        BPJS: req.body.BPJS,
        phoneNumber: req.body.phoneNumber,
      });

      res.status(201).json({
        id: patient.id,
        name: patient.name,
        email: patient.email,
        dateOfBirth: patient.dateOfBirth,
        address: patient.address,
        gender: patient.gender,
        image: patient.image,
        NIK: patient.NIK,
        BPJS: patient.BPJS,
        phoneNumber: patient.phoneNumber,
        createdAt: patient.createdAt,
        updatedAt: patient.updatedAt
      })
    } catch (err) {
      res.status(400).json({
        status: 'Failed',
        message: err.message
      });
    }
  }
}