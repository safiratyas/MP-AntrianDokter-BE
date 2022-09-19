const { Admins } = require("../models");

module.exports = {
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