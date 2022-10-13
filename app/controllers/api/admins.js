const adminServices = require('../../services/admins');
const queueServices = require('../../services/queues');
const {
  checkPassword,
  createToken
} = require('../../plugin');

module.exports = {
  async login(req, res) {
    try {
      const email = req.body.email.toLowerCase();
      const password = req.body.password;

      const admin = await adminServices.getOne({
        where: {
          email
        },
      });

      if (!admin) {
        res.status(404).json({
          status: "Failed",
          message: "Email tidak ditemukan!"
        });
        return;
      }

      const isPasswordCorrect = await checkPassword(password, admin.password);

      if (!isPasswordCorrect) {
        res.status(401).json({
          status: "Failed",
          message: "Password salah!"
        });
        return;
      }

      const token = createToken({
        id: admin.id,
        name: admin.name,
        email: admin.email,
        role: 'Admin',
      }, process.env.JWT_PRIVATE_KEY || "Token");

      res.status(201).json({
        id: admin.id,
        name: admin.name,
        email: admin.email,
        token,
        createdAt: admin.createdAt,
        updatedAt: admin.updatedAt,
      });
    } catch (err) {
      res.status(400).json({
        status: "Failed",
        message: err.message
      });
    }
  },

  async whoAmI(req, res) {
    try {
      res.status(200).json({
        id: req.admin.id,
        name: req.admin.name,
        email: req.admin.email,
        phoneNumber: req.admin.phoneNumber,
        gender: req.admin.gender,
        createdAt: req.admin.createdAt,
        updatedAt: req.admin.updatedAt
      });
    } catch (err) {
      res.status(404).json({
        status: 'Failed',
        message: err.message,
      });
    }
  },

  async getAllQueue(req, res){
    const getAll = await queueServices.list();

    res.status(200).json({
      status: 'Success',
      data: getAll
    });
  },

  async getAdmin(req, res) {
    try {
      const admin = await adminServices.getOne({
        where: {
          id: req.params.id
        },
        attributes: {
          exclude: ['password']
        }
      });

      if (!admin) {
        throw new Error(`Admin dengan ID ${req.params.id} tidak ditemukan!`);
      }

      res.status(200).json(admin);
    } catch (err) {
      res.status(404).json({
        status: 'Failed',
        message: err.message,
      });
    }
  },

  async getAllAdmins(req, res) {
    const getAll = await adminServices.list({
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