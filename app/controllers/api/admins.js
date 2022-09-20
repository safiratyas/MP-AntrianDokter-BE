const adminServices = require('../../services/admins');
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

      const admin = await adminServices.create({
        name: req.body.name,
        email: req.body.email.toLowerCase(),
        password: encryptedPassword,
        gender: req.body.gender,
        image: null,
        phoneNumber: req.body.phoneNumber,
      });

      res.status(201).json({
        id: admin.id,
        name: admin.name,
        email: admin.email,
        gender: admin.gender,
        image: admin.image,
        phoneNumber: admin.phoneNumber,
        createdAt: admin.createdAt,
        updatedAt: admin.updatedAt
      });
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

      const admin = await adminServices.getOne({
        where: {
          email
        },
      });

      if (!admin) {
        res.status(404).json({
          status: "Failed",
          message: "Email not found!"
        });
        return;
      }

      const isPasswordCorrect = await checkPassword(password, admin.password);

      if (!isPasswordCorrect) {
        res.status(401).json({
          status: "Failed",
          message: "Password is incorrect!"
        });
        return;
      }

      const token = createToken({
        id: admin.id,
        name: admin.name,
        email: admin.email,
      }, process.env.JWT_PRIVATE_KEY || "Token", {
        expiresIn: '1h'
      });

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

  async updateDetail(req, res) {
    try {
      const {
        name,
        image,
        phoneNumber,
        gender
      } = req.body;

      const update = await adminServices.update(req.params.id, {
        name,
        image,
        phoneNumber,
        gender,
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
    res.status(200).json(req.admin);
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
        throw new Error(`Admin with id ${req.params.id} not found!`);
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