const userStatusRepository = require('../repositories/UserStatusRepository');
const logger = require('../utils/logger');

class UserStatusService {
  async create(userStatusData) {
    logger.info('Creating a new user status', { userStatusData });
    return await userStatusRepository.create(userStatusData);
  }

  async findAll() {
    logger.info('Fetching all user statuses');
    return await userStatusRepository.findAll();
  }

  async findById(id) {
    logger.info(`Fetching user status with id: ${id}`);
    return await userStatusRepository.findById(id);
  }

  async update(id, userStatusData) {
    logger.info(`Updating user status with id: ${id}`, { userStatusData });
    return await userStatusRepository.update(id, userStatusData);
  }

  async delete(id) {
    logger.info(`Deleting user status with id: ${id}`);
    return await userStatusRepository.delete(id);
  }
}

module.exports = new UserStatusService();
