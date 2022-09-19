const queuesRepository = require("../repositories/queues");

module.exports = {
  async list() {
    const queues = await queuesRepository.findAll();
    const queuesCount = await queuesRepository.getTotalQueues();

    return {
      data: queues,
      count: queuesCount,
    };
  },

  get(id) {
    return queuesRepository.find(id);
  },

  getOne(key) {
    return queuesRepository.findOne(key);
  },
};