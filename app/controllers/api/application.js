const { Op } = require("sequelize");
const {
  Genders,
  Patients
} = require("../../models");

module.exports = {
  getRoot(req, res) {
    res.status(200).json({
      status: "OK",
      message: "MediaQ API is up and running!",
    });
  },

  handleNotFound(req, res) {
    const err = new Error("Root Not Found!");
    res.status(404).json({
      error: {
        name: err.name,
        message: err.message,
        details: err.details,
      }
    });
    return query;
  },
};