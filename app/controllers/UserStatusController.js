const userStatusService = require('../services/UserStatusService');
const logger = require('../utils/logger');
const customResponse = require('../utils/customResponse');

class UserStatusController {
  async create(req, res) {
    logger.info('POST /user-statuses - creating a new user status', { body: req.body });
    try {
      const userStatus = await userStatusService.create(req.body);
      logger.info('Successfully created a new user status', { userStatus });
      customResponse.success(res, userStatus, 'User status created successfully', 201);
    } catch (error) {
      logger.error('Error creating a new user status', { error: error.message });
      customResponse.error(res, error.message);
    }
  }

  async findAll(req, res) {
    logger.info('GET /user-statuses - fetching all user statuses');
    try {
      const userStatuses = await userStatusService.findAll();
      logger.info('Successfully fetched all user statuses');
      customResponse.success(res, userStatuses, 'User statuses fetched successfully');
    } catch (error) {
      logger.error('Error fetching all user statuses', { error: error.message });
      customResponse.error(res, error.message);
    }
  }

  async findById(req, res) {
    logger.info(`GET /user-statuses/${req.params.id} - fetching user status by id`);
    try {
      const userStatus = await userStatusService.findById(req.params.id);
      if (userStatus) {
        logger.info(`Successfully fetched user status with id: ${req.params.id}`);
        customResponse.success(res, userStatus, 'User status fetched successfully');
      } else {
        logger.warn(`User status with id: ${req.params.id} not found`);
        customResponse.notFound(res, 'User status not found');
      }
    } catch (error) {
      logger.error(`Error fetching user status with id: ${req.params.id}`, { error: error.message });
      customResponse.error(res, error.message);
    }
  }

  async update(req, res) {
    logger.info(`PUT /user-statuses/${req.params.id} - updating user status by id`, { body: req.body });
    try {
      const userStatus = await userStatusService.update(req.params.id, req.body);
      if (userStatus) {
        logger.info(`Successfully updated user status with id: ${req.params.id}`);
        customResponse.success(res, userStatus, 'User status updated successfully');
      } else {
        logger.warn(`User status with id: ${req.params.id} not found for update`);
        customResponse.notFound(res, 'User status not found');
      }
    } catch (error) {
      logger.error(`Error updating user status with id: ${req.params.id}`, { error: error.message });
      customResponse.error(res, error.message);
    }
  }

  async delete(req, res) {
    logger.info(`DELETE /user-statuses/${req.params.id} - deleting user status by id`);
    try {
      const result = await userStatusService.delete(req.params.id);
      if (result) {
        logger.info(`Successfully deleted user status with id: ${req.params.id}`);
        customResponse.success(res, null, 'User status deleted successfully', 204);
      } else {
        logger.warn(`User status with id: ${req.params.id} not found for deletion`);
        customResponse.notFound(res, 'User status not found');
      }
    } catch (error) {
      logger.error(`Error deleting user status with id: ${req.params.id}`, { error: error.message });
      customResponse.error(res, error.message);
    }
  }
}

module.exports = new UserStatusController();
