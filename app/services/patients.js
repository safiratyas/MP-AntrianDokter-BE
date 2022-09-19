const patientRepository = require("../repositories/patients");

module.exports = {
	create(requestBody) {
		return patientRepository.create(requestBody);
	},

	update(id, requestBody) {
		return patientRepository.update(id, requestBody);
	},

	delete(id) {
		return patientRepository.delete(id);
	},

	async listByCondition(condition) {
		// eslint-disable-next-line no-useless-catch
		try {
			const patients = await patientRepository.findAll(condition);
			const patientsCount = await patientRepository.getTotalPatients();

			return {
				data: patients,
				count: patientsCount,
			};
		} catch (err) {
			throw err;
		}
	},

	get(id) {
		return patientRepository.find(id);
	},

	getOne(key) {
		return patientRepository.findOne(key);
	},
};