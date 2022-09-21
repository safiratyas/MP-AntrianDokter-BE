const application = require("./application");
const patients = require("./patients");
const admins = require("./admins");
const doctors =  require("./doctors");
const examinations = require("./examinations");

module.exports = {
  application,
  admins,
  patients,
  doctors,
  examinations
};