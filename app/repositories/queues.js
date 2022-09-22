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

	deleteAll(){
		Queues.destroy({
			where: {},
			truncate: true,
			restartIdentity: true
		})
	},
  
	find(id) {
		return Queues.findByPk(id);
	},

	findAll(queue) {
		return Queues.findAll(queue);
	},

	findOne(key) {
		return Queues.findOne(key);
	},

	getTotalQueues() {
		return Queues.count();
	},
};