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
        genderId: req.body.genderId,
        image: null,
        phoneNumber: req.body.phoneNumber
      });

      res.status(201).json({
        id: admin.id,
        name: admin.name,
        email: admin.email,
        createdAt: admin.createdAt,
        updatedAt: admin.updatedAt
      })
    } catch (err) {
      res.status(400).json({
        status: 'Failed',
        message: err.message
      });
    }
  },

  // async login(req, res) {
  //   try {
  //     const email = req.body.email.toLowerCase();
  //     const password = req.body.password;

  //     const patient = await patientServices.getOne({
  //       where: {
  //         email
  //       },
  //     });

  //     if (!patient) {
  //       res.status(404).json({
  //         status: "Failed",
  //         message: "Email not found!"
  //       });
  //       return;
  //     }

  //     const isPasswordCorrect = await checkPassword(password, user.encryptedPassword);

  //     if (!isPasswordCorrect) {
  //       res.status(401).json({
  //         status: "Failed",
  //         message: "Password is incorrect!"
  //       });
  //       return;
  //     }

  //     const token = createToken({
  //       id: patient.id,
  //       name: patient.name,
  //       email: patient.email,
  //     }, process.env.JWT_PRIVATE_KEY || "Token", {
  //       expiresIn: '1h'
  //     });

  //     res.status(201).json({
  //       id: patient.id,
  //       name: patient.name,
  //       email: patient.email,
  //       token,
  //       createdAt: patient.createdAt,
  //       updatedAt: patient.updatedAt,
  //     });
  //   } catch (err) {
  //     res.status(400).json({
  //       status: "Failed",
  //       message: err.message
  //     });
  //   }
  // },

  // async updateDetail(req, res) {
  //   try {
  //     const {
  //       name,
  //       address,
  //       image,
  //       phoneNumber
  //     } = req.body;

  //     const id = req.params.id;
  //     const compareId = id.toString() === req.patient.id.toString();
  //     if (!compareId) {
  //       res.status(401).json({
  //         status: "FAIL",
  //         message: "Patient who can edit or delete patient data is him/herself."
  //       });
  //       return;
  //     }

  //     const update = await patientServices.update(req.params.id, {
  //       name,
  //       address,
  //       image,
  //       phoneNumber,
  //     });

  //     res.status(200).json({
  //       status: "OK",
  //       message: `Patient with id ${req.params.id} has been updated.`,
  //     });

  //   } catch (err) {
  //     res.status(422).json({
  //       status: "FAIL",
  //       message: err.message,
  //     });
  //   }
  // },

  // async whoAmI(req, res) {
  //   res.status(200).json(req.patient);
  // },

  // async getPatient(req, res) {
  //   try {
  //     const patient = await patientServices.getOne({
  //       where: {
  //         id: req.params.id
  //       },
  //       include: {
  //         model: Genders,
  //         as: "genderPatient",
  //         attributes: ["name"]
  //       },
  //       attributes: {
  //         exclude: ["encryptedPassword"]
  //       }
  //     });

  //     if (!patient) {
  //       throw new Error(`Patient with id ${req.params.id} not found!`);
  //     }

  //     res.status(200).json(patient);
  //   } catch (err) {
  //     res.status(404).json({
  //       status: "FAIL",
  //       message: err.message,
  //     });
  //   }
  // },

  // async getAllPatient(req, res) {
  //   const getAll = await patientServices.listByCondition({
  //     attributes: {
  //       exclude: ["encryptedPassword"]
  //     }
  //   });

  //   res.status(200).json({
  //     status: "success",
  //     data: getAll
  //   });
  // },
};