const application = require("./application");
const patients = require("./patients");
const admins = require("./admins");
const queue = require("./queue");
const examinations = require("./examinations");

module.exports = {
  application,
  admins,
  patients,
  queue,
  examinations
};