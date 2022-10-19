const queuesRepository = require("../repositories/queues");

module.exports = {
 async create(requestBody) {
    const queues = await queuesRepository.create(requestBody);
    const queuesCount = await queuesRepository.getTotalQueues();

    return {
      data: queues,
      count: queuesCount,
    };
    // return queuesRepository.create(requestBody);
  },

  update(id, requestBody) {
    return queuesRepository.update(id, requestBody);
  },

  delete(id) {
    return queuesRepository.delete(id);
  },

  deleteAll(){
    return queuesRepository.deleteAll();
  },

  async list(query) {
    const queues = await queuesRepository.findAll(query);
    const queuesCount = await queuesRepository.getTotalQueues();

    return {
      data: queues,
      count: queuesCount,
    };
  },

  // async listByCondition(query) {
  //   return queuesRepository.findAll(query)
  // },

  get(id) {
    return queuesRepository.find(id);
  },

  getOne(key) {
    return queuesRepository.findOne(key);
  },
};