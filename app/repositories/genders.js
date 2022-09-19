const { Genders } = require("../models");

module.exports = {
	find(id) {
		return Genders.findByPk(id);
	},

	findAll() {
		return Genders.findAll();
	},

	findOne(key) {
		return Genders.findOne(key);
	},

	getTotalGenders() {
		return Genders.count();
	},
};