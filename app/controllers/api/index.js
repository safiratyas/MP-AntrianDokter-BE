const application = require("./application");
const patients = require("./patients");
const admins = require("./admins");
const queue = require("./queue");

module.exports = {
  application,
  admins,
  patients,
  queue
};