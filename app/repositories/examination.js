const { Examinations } = require("../models");

module.exports = {
	find(id) {
		return Examinations.findByPk(id);
	},

	findAll() {
		return Examinations.findAll();
	},

	findOne(key) {
		return Examinations.findOne(key);
	},

	getTotalExaminations() {
		return Examinations.count();
	},
};