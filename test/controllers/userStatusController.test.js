const userStatusController = require('../../app/controllers/UserStatusController');
const userStatusService = require('../../app/services/UserStatusService');
const customResponse = require('../../app/utils/customResponse');
const logger = require('../../app/utils/logger');

// Mock all dependencies of the controller
jest.mock('../../app/services/UserStatusService');
jest.mock('../../app/utils/customResponse');
jest.mock('../../app/utils/logger');

// Create mock request and response objects for each test
let req, res;

beforeEach(() => {
  jest.clearAllMocks();
  req = { body: {}, params: {} };
  res = { status: jest.fn().mockReturnThis(), json: jest.fn().mockReturnThis() };
});

describe('UserStatusController Unit Tests', () => {

  describe('create', () => {
    it('should log info, call service, and return a 201 success response', async () => {
      req.body = { name: 'new_status' };
      const newStatus = { id: 1, ...req.body };
      userStatusService.create.mockResolvedValue(newStatus);

      await userStatusController.create(req, res);

      expect(logger.info).toHaveBeenCalledWith('POST /user-statuses - creating a new user status', { body: req.body });
      expect(userStatusService.create).toHaveBeenCalledWith(req.body);
      expect(logger.info).toHaveBeenCalledWith('Successfully created a new user status', { userStatus: newStatus });
      expect(customResponse.success).toHaveBeenCalledWith(res, newStatus, 'User status created successfully', 201);
    });

    it('should log error and return a 500 response on service failure', async () => {
      req.body = { name: 'new_status' };
      const error = new Error('Database failure');
      userStatusService.create.mockRejectedValue(error);

      await userStatusController.create(req, res);

      expect(logger.error).toHaveBeenCalledWith('Error creating a new user status', { error: error.message });
      expect(customResponse.error).toHaveBeenCalledWith(res, error.message);
    });
  });

  describe('findAll', () => {
    it('should log info, fetch all statuses, and return a 200 success response', async () => {
      const statuses = [{ id: 1, name: 'active' }];
      userStatusService.findAll.mockResolvedValue(statuses);

      await userStatusController.findAll(req, res);

      expect(logger.info).toHaveBeenCalledWith('GET /user-statuses - fetching all user statuses');
      expect(userStatusService.findAll).toHaveBeenCalled();
      expect(logger.info).toHaveBeenCalledWith('Successfully fetched all user statuses');
      expect(customResponse.success).toHaveBeenCalledWith(res, statuses, 'User statuses fetched successfully');
    });
  });

  describe('findById', () => {
    it('should log info, fetch a status, and return a 200 success response', async () => {
      req.params.id = '1';
      const status = { id: 1, name: 'active' };
      userStatusService.findById.mockResolvedValue(status);

      await userStatusController.findById(req, res);

      expect(logger.info).toHaveBeenCalledWith('GET /user-statuses/1 - fetching user status by id');
      expect(userStatusService.findById).toHaveBeenCalledWith('1');
      expect(logger.info).toHaveBeenCalledWith('Successfully fetched user status with id: 1');
      expect(customResponse.success).toHaveBeenCalledWith(res, status, 'User status fetched successfully');
    });

    it('should log a warning and return a 404 response if status is not found', async () => {
      req.params.id = '99';
      userStatusService.findById.mockResolvedValue(null);

      await userStatusController.findById(req, res);

      expect(logger.warn).toHaveBeenCalledWith('User status with id: 99 not found');
      expect(customResponse.notFound).toHaveBeenCalledWith(res, 'User status not found');
    });
  });

  describe('update', () => {
    it('should log info, update a status, and return a 200 success response', async () => {
      req.params.id = '1';
      req.body = { name: 'updated_status' };
      const updatedStatus = { id: 1, ...req.body };
      userStatusService.update.mockResolvedValue(updatedStatus);

      await userStatusController.update(req, res);

      expect(logger.info).toHaveBeenCalledWith('PUT /user-statuses/1 - updating user status by id', { body: req.body });
      expect(userStatusService.update).toHaveBeenCalledWith('1', req.body);
      expect(logger.info).toHaveBeenCalledWith('Successfully updated user status with id: 1');
      expect(customResponse.success).toHaveBeenCalledWith(res, updatedStatus, 'User status updated successfully');
    });

    it('should log a warning and return a 404 response if status to update is not found', async () => {
      req.params.id = '99';
      userStatusService.update.mockResolvedValue(null);

      await userStatusController.update(req, res);

      expect(logger.warn).toHaveBeenCalledWith('User status with id: 99 not found for update');
      expect(customResponse.notFound).toHaveBeenCalledWith(res, 'User status not found');
    });
  });

  describe('delete', () => {
    it('should log info, delete a status, and return a 204 success response', async () => {
      req.params.id = '1';
      userStatusService.delete.mockResolvedValue(true);

      await userStatusController.delete(req, res);

      expect(logger.info).toHaveBeenCalledWith('DELETE /user-statuses/1 - deleting user status by id');
      expect(userStatusService.delete).toHaveBeenCalledWith('1');
      expect(logger.info).toHaveBeenCalledWith('Successfully deleted user status with id: 1');
      expect(customResponse.success).toHaveBeenCalledWith(res, null, 'User status deleted successfully', 204);
    });

    it('should log a warning and return a 404 response if status to delete is not found', async () => {
      req.params.id = '99';
      userStatusService.delete.mockResolvedValue(false);

      await userStatusController.delete(req, res);

      expect(logger.warn).toHaveBeenCalledWith('User status with id: 99 not found for deletion');
      expect(customResponse.notFound).toHaveBeenCalledWith(res, 'User status not found');
    });
  });
});
