const patientServices = require('../services/patients');

module.exports = {
  async checkCondition(req, res, next) {
    const {
      email,
      name,
      password,
      dateOfBirth,
      address,
      gender,
      NIK,
      BPJS, 
    } = req.body;
    if (password.length < 8) {
      res.status(400).json({
        status: 'Failed',
        message: 'Password must have at least 8 characters!'
      });
      return;
    }

    if (!name) {
      res.status(400).json({
        status: 'failed',
        message: 'Name cannot be empty!'
      });
      return;
    }

    const filter = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/g;

    if (email == '' || email.search(filter) == -1) {
      res.status(400).json({
        status: 'Failed',
        message: 'Wrong email format!'
      });
      return;
    }

    const uniqueEmail = await patientServices.getOne({
      where: {
        email
      }
    });

    if (uniqueEmail) {
      res.status(409).json({
        status: 'Failed',
        message: 'Email already taken!'
      });
      return;
    }

    if (!dateOfBirth) {
      res.status(400).json({
        status: 'Failed',
        message: 'Date of Birth cannot be empty!'
      });
      return;
    }

    if (!address) {
      res.status(400).json({
        status: 'Failed',
        message: 'Address cannot be empty!'
      });
      return;
    }

    if(gender !== 'Pria' && gender !== 'Wanita') {
      res.status(400).json({
        status: 'Failed',
        message: 'Gender must be filled either Pria or Wanita'
      });
      return
    }

    const uniqueNIK = await patientServices.getOne({
      where: {
        NIK
      }
    });

    if (uniqueNIK) {
      res.status(409).json({
        status: 'Failed',
        message: 'NIK already taken!'
      });
      return;
    }

    const uniqueBPJS = await patientServices.getOne({
      where: {
        BPJS
      }
    });

    if (uniqueBPJS) {
      res.status(409).json({
        status: 'Failed',
        message: 'BPJS already taken!'
      });
      return;
    }
    next();
  },
};