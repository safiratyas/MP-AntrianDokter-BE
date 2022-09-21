const {
	Queues
} = require("../models");

module.exports = {
	create(inputData) {
		return Queues.create(inputData);
	},

	update(id, updateData) {
		return Queues.update(updateData, {
			where: {
				id
			}
		});
	},

	delete(id) {
		return Queues.destroy({
			where: {
				id
			}
		});
	},
  
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