const UserStatusController = require('../../app/controllers/UserStatusController');
const UserStatusService = require('../../app/services/UserStatusService');
const customResponse = require('../../app/utils/customResponse');
const logger = require('../../app/utils/logger');

// Mock all dependency classes
jest.mock('../../app/services/UserStatusService');
jest.mock('../../app/utils/customResponse');
jest.mock('../../app/utils/logger');

// Declare variables for instances
let userStatusController;
let mockUserStatusService;
let req, res;

beforeEach(() => {
  jest.clearAllMocks();

  // Create new mock instances for each test
  mockUserStatusService = new UserStatusService();

  // Create a new controller instance, injecting the mocks
  userStatusController = new UserStatusController(mockUserStatusService, logger, customResponse);

  // Mock Express request and response objects
  req = { body: {}, params: {} };
  res = { status: jest.fn().mockReturnThis(), json: jest.fn().mockReturnThis() };
});

describe('UserStatusController Unit Tests', () => {

  describe('create', () => {
    it('should call the service and return a 201 success response', async () => {
      req.body = { name: 'new_status' };
      const newStatus = { id: 1, ...req.body };
      mockUserStatusService.create.mockResolvedValue(newStatus);

      await userStatusController.create(req, res);

      expect(mockUserStatusService.create).toHaveBeenCalledWith(req.body);
      expect(customResponse.success).toHaveBeenCalledWith(res, newStatus, 'User status created successfully', 201);
    });

    it('should handle service errors and return a 500 error response', async () => {
      req.body = { name: 'new_status' };
      const error = new Error('Database failure');
      mockUserStatusService.create.mockRejectedValue(error);

      await userStatusController.create(req, res);

      expect(customResponse.error).toHaveBeenCalledWith(res, error.message);
    });
  });

  describe('findAll', () => {
    it('should fetch all statuses and return a 200 success response', async () => {
      const statuses = [{ id: 1, name: 'active' }];
      mockUserStatusService.findAll.mockResolvedValue(statuses);

      await userStatusController.findAll(req, res);

      expect(mockUserStatusService.findAll).toHaveBeenCalled();
      expect(customResponse.success).toHaveBeenCalledWith(res, statuses, 'User statuses fetched successfully');
    });
  });

  describe('findById', () => {
    it('should fetch a status by id and return a 200 success response', async () => {
      req.params.id = '1';
      const status = { id: 1, name: 'active' };
      mockUserStatusService.findById.mockResolvedValue(status);

      await userStatusController.findById(req, res);

      expect(mockUserStatusService.findById).toHaveBeenCalledWith('1');
      expect(customResponse.success).toHaveBeenCalledWith(res, status, 'User status fetched successfully');
    });

    it('should return a 404 not found response if status does not exist', async () => {
      req.params.id = '99';
      mockUserStatusService.findById.mockResolvedValue(null);

      await userStatusController.findById(req, res);

      expect(customResponse.notFound).toHaveBeenCalledWith(res, 'User status not found');
    });
  });

  describe('update', () => {
    it('should update a status and return a 200 success response', async () => {
      req.params.id = '1';
      req.body = { name: 'updated_status' };
      const updatedStatus = { id: 1, ...req.body };
      mockUserStatusService.update.mockResolvedValue(updatedStatus);

      await userStatusController.update(req, res);

      expect(mockUserStatusService.update).toHaveBeenCalledWith('1', req.body);
      expect(customResponse.success).toHaveBeenCalledWith(res, updatedStatus, 'User status updated successfully');
    });

    it('should return a 404 not found response if status to update does not exist', async () => {
      req.params.id = '99';
      mockUserStatusService.update.mockResolvedValue(null);

      await userStatusController.update(req, res);

      expect(customResponse.notFound).toHaveBeenCalledWith(res, 'User status not found');
    });
  });

  describe('delete', () => {
    it('should delete a status and return a 204 success response', async () => {
      req.params.id = '1';
      mockUserStatusService.delete.mockResolvedValue(true);

      await userStatusController.delete(req, res);

      expect(mockUserStatusService.delete).toHaveBeenCalledWith('1');
      expect(customResponse.success).toHaveBeenCalledWith(res, null, 'User status deleted successfully', 204);
    });

    it('should return a 404 not found response if status to delete does not exist', async () => {
      req.params.id = '99';
      mockUserStatusService.delete.mockResolvedValue(false);

      await userStatusController.delete(req, res);

      expect(customResponse.notFound).toHaveBeenCalledWith(res, 'User status not found');
    });
  });
});
