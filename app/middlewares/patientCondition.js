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
      BPJS
    } = req.body;

    if (!name) {
      res.status(400).json({
        status: 'Failed',
        message: 'Nama tidak boleh kosong!'
      });
      return;
    }

    if (!NIK) {
      res.status(400).json({
        status: 'Failed',
        message: 'NIK tidak boleh kosong!'
      });
      return;
    }

    const uniqueNIK = await patientServices.getOne({
      where: {
        NIK
      }
    });

    if (uniqueNIK) {
      res.status(409).json({
        status: 'Failed',
        message: 'NIK sudah terdaftar!'
      });
      return;
    }

    if (!email) {
      res.status(400).json({
        status: 'Failed',
        message: 'Email tidak boleh kosong!'
      });
      return;
    }

    const filter = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/g;

    if (email == '' || email.search(filter) == -1) {
      res.status(400).json({
        status: 'Failed',
        message: 'Format penulisan email salah!'
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
        message: 'Email sudah terdaftar!'
      });
      return;
    }

    if (!dateOfBirth) {
      res.status(400).json({
        status: 'Failed',
        message: 'Tanggal lahir tidak boleh kosong!'
      });
      return;
    }

    if (!address) {
      res.status(400).json({
        status: 'Failed',
        message: 'Alamat tidak boleh kosong!'
      });
      return;
    }

    if (!gender) {
      res.status(400).json({
        status: 'Failed',
        message: 'Gender tidak boleh kosong!'
      });
      return;
    }

    if (BPJS) {
      const uniqueBPJS = await patientServices.getOne({
        where: {
          BPJS
        }
      });

      if (uniqueBPJS) {
        res.status(409).json({
          status: 'Failed',
          message: 'BPJS sudah terdaftar!'
        });
        return;
      }
    }

    if (!password) {
      res.status(400).json({
        status: 'Failed',
        message: 'Password tidak boleh kosong!'
      });
      return;
    }
    
    if (password.length < 8) {
      res.status(400).json({
        status: 'Failed',
        message: 'Password harus lebih dari 7 karakter!'
      });
      return;
    }

    next();
  },
};