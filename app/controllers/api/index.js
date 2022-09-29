const application = require("./application");
const patients = require("./patients");
const admins = require("./admins");
const queues = require("./queues");
const examinations = require("./examinations");
const bookings = require("./bookings");

module.exports = {
  application,
  admins,
  patients,
  queues,
  examinations,
  bookings
};