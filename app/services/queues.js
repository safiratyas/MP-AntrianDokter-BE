const queuesRepository = require("../repositories/queues");

module.exports = {
  create(requestBody) {
    return queuesRepository.create(requestBody);
  },

  update(id, requestBody) {
    return queuesRepository.update(id, requestBody);
  },

  delete(id) {
    return queuesRepository.delete(id);
  },

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