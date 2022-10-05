const application = require("./application");
const patients = require("./patients");
const admins = require("./admins");
const queues = require("./queues");
const examinations = require("./examinations");
const bookings = require("./bookings");
const notifications = require("./notification");

module.exports = {
  application,
  admins,
  patients,
  queues,
  examinations,
  bookings,
  notifications
};