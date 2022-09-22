const patientServices = require('../../services/patients');
const timeFormat = require('../../utils/timeFormat');
const { Doctors } = require('../../models')
const {
  checkPassword,
  createToken,
  hashPassword
} = require('../../plugin');
const queue = require('./queue');

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
        BPJS: req.body.BPJS || null,
        NIK: req.body.NIK,
        phoneNumber: req.body.phoneNumber,
      });

      res.status(201).json({
        id: patient.id,
        name: patient.name,
        email: patient.email,
        dateOfBirth: timeFormat(patient.dateOfBirth),
        address: patient.address,
        gender: patient.gender,
        image: patient.image,
        BPJS: patient.BPJS,
        NIK: patient.NIK,
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
  },

  async login(req, res) {
    try {
      const email = req.body.email.toLowerCase();
      const password = req.body.password;

      const patient = await patientServices.getOne({
        where: {
          email
        },
      });

      if(!patient) {
        res.status(404).json({
          status: 'Failed',
          message: 'Email Not Found!'
        });
        return;
      }

      const isPasswordCorrect = await checkPassword(password, patient.password);

      if(!isPasswordCorrect) {
        res.status(401).json({
          status: 'Failed',
          message: 'Password is incorrect!'
        });
        return;
      }

      const token = createToken({
        id: patient.id,
        name: patient.name,
        email: patient.email,
        role: "Pasien",
      }, process.env.JWT_PRIVATE_KEY || 'Token', {
        expiresIn: '1h'
      });

      res.status(201).json({
        id: patient.id,
        name: patient.name,
        email: patient.email,
        token,
        createdAt: patient.createdAt,
        updatedAt: patient.updatedAt,
      });
    } catch (err) {
      res.status(400).json({
        status: 'Failed',
        message: err.message,
      });
    }
  },

  async updateDetail(req, res) {
    console.log(req.patient);
    try {
      const {
        name,
        dateOfBirth,
        address,
        gender,
        image,
        NIK,
        BPJS,
        phoneNumber
      } = req.body;

      const id = req.params.id;
      const compareId = id.toString() === req.patient.id.toString();

      if (!compareId) {
        res.status(401).json({
          status: 'Failed',
          message: 'Patient who can edit or delete patient data is him/herself.'
        });
        return;
      }

      const update = await patientServices.update(req.params.id, {
        name,
        dateOfBirth,
        address,
        gender,
        image,
        NIK,
        BPJS,
        phoneNumber,
      });

      res.status(200).json({
        status: 'OK',
        message: `Patient with id ${req.params.id} has been updated.`,
      });
    } catch (err) {
      res.status(422).json({
        status: 'Failed',
        message: err.message,
      });
    }
  }, 

  async whoAmI(req, res) {
    res.status(200).json(req.patient);
  },

  async getPatient(req, res) {
    try {
      const patient = await patientServices.getOne({
        where: {
          id: req.params.id
        },
        attributes: {
          exclude: ['password']
        }
      });

      if (!patient) {
        throw new Error(`Patient with id ${req.params.id} not found!`);
      }

      res.status(200).json(patient);
    } catch (err) {
      res.status(404).json({
        status: 'Failed',
        message: err.message,
      });
    }
  },

  async getAllPatients(req, res) {
    const getAll = await patientServices.listByCondition({
      attributes: {
        exclude: ['password']
      }
    });

    res.status(200).json({
      status: 'Success',
      data: getAll
    });
  },
};