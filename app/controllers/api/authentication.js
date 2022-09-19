const patientServices = require("../../services/patients");
// const { Genders } = require("../../models");
const {
  checkPassword,
  createToken,
  hashPassword
} = require("../../plugin");

module.exports = {
    async register(req, res) {
        console.log(req.body.dateOfBirth)
        try {
          const password = req.body.password;
          const encryptedPassword = await hashPassword(password, 10);
    
          const patient = await patientServices.create({
            name: req.body.name,
            email: req.body.email.toLowerCase(),
            encryptedPassword,
            // dateOfBirth: req.body.dateOfBirth,
            // address: req.body.address,
            // genderId: req.body.genderId,
            // NIK: req.body.NIK,
            // phoneNumber: req.body.phoneNumber,
            
          });
    
          res.status(201).json({
            id: patient.id,
            name: patient.name,
            email: patient.email,
            createdAt: patient.createdAt,
            updatedAt: patient.updatedAt,
          });
        } catch (err) {
          res.status(400).json({
            status: "Failed",
            message: err.message
          });
        }
      },
    }