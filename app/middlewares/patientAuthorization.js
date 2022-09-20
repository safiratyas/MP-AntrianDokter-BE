const { decodeToken } = require("../plugin");
const patientServices = require("../services/patients");

module.exports = {
  async authorize(req, res, next) {
    try {
      if (!req.headers.authorization) {
        res.status(401).json({
          status: "Failed",
          message: "Insert Token!"
        });
        return;
      }

      const token = req.headers.authorization.split("Bearer ")[1];
      const tokenPayload = decodeToken(
        token,
        process.env.JWT_PRIVATE_KEY || "Token"
      );

      req.patient = await patientServices.get(tokenPayload.id);

      next();
    } catch (err) {
      res.status(401).json({
        error: err.message,
        message: "Unauthorized."
      });
    }
  },
};