const { Admins } = require("../models");

module.exports = {
  create(inputData) {
    return Admins.create(inputData);
  },

	find(id) {
		return Admins.findByPk(id);
	},

	findAll() {
		return Admins.findAll();
	},

	findOne(key) {
		return Admins.findOne(key);
	},

	getTotalAdmins() {
		return Admins.count();
	},
};