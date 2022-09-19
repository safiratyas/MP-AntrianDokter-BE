const { Doctors } = require("../models");

module.exports = {
	find(id) {
		return Doctors.findByPk(id);
	},

	findAll() {
		return Doctors.findAll();
	},

	findOne(key) {
		return Doctors.findOne(key);
	},

	getTotalDoctors() {
		return Doctors.count();
	},
};