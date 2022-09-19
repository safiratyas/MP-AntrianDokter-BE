const { Queues } = require("../models");

module.exports = {
	find(id) {
		return Queues.findByPk(id);
	},

	findAll() {
		return Queues.findAll();
	},

	findOne(key) {
		return Queues.findOne(key);
	},

	getTotalQueues() {
		return Queues.count();
	},
};