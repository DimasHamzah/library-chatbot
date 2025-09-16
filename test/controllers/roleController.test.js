const RoleController = require('../../app/controllers/RoleController');
const RoleService = require('../../app/services/RoleService');
const customResponse = require('../../app/utils/customResponse');
const logger = require('../../app/utils/logger');

// Mock all dependency classes
jest.mock('../../app/services/RoleService');
jest.mock('../../app/utils/customResponse');
jest.mock('../../app/utils/logger');

// Declare variables for instances
let roleController;
let mockRoleService;
let req, res;

beforeEach(() => {
  jest.clearAllMocks();

  // Create new mock instances for each test
  mockRoleService = new RoleService();

  // Create a new controller instance, injecting the mocks
  roleController = new RoleController(mockRoleService, logger, customResponse);

  // Mock Express request and response objects
  req = { body: {}, params: {} };
  res = { status: jest.fn().mockReturnThis(), json: jest.fn().mockReturnThis() };
});

describe('RoleController Unit Tests', () => {

  describe('create', () => {
    it('should call the service and return a 201 success response', async () => {
      req.body = { name: 'new_role' };
      const newRole = { id: 1, ...req.body };
      mockRoleService.create.mockResolvedValue(newRole);

      await roleController.create(req, res);

      expect(mockRoleService.create).toHaveBeenCalledWith(req.body);
      expect(customResponse.success).toHaveBeenCalledWith(res, newRole, 'Role created successfully', 201);
    });

    it('should handle service errors and return a 500 error response', async () => {
      req.body = { name: 'new_role' };
      const error = new Error('Database failure');
      mockRoleService.create.mockRejectedValue(error);

      await roleController.create(req, res);

      expect(customResponse.error).toHaveBeenCalledWith(res, error.message);
    });
  });

  describe('findAll', () => {
    it('should fetch all roles and return a 200 success response', async () => {
      const roles = [{ id: 1, name: 'admin' }];
      mockRoleService.findAll.mockResolvedValue(roles);

      await roleController.findAll(req, res);

      expect(mockRoleService.findAll).toHaveBeenCalled();
      expect(customResponse.success).toHaveBeenCalledWith(res, roles, 'Roles fetched successfully');
    });
  });

  describe('findById', () => {
    it('should fetch a role by id and return a 200 success response', async () => {
      req.params.id = '1';
      const role = { id: 1, name: 'admin' };
      mockRoleService.findById.mockResolvedValue(role);

      await roleController.findById(req, res);

      expect(mockRoleService.findById).toHaveBeenCalledWith('1');
      expect(customResponse.success).toHaveBeenCalledWith(res, role, 'Role fetched successfully');
    });

    it('should return a 404 not found response if role does not exist', async () => {
      req.params.id = '99';
      mockRoleService.findById.mockResolvedValue(null);

      await roleController.findById(req, res);

      expect(customResponse.notFound).toHaveBeenCalledWith(res, 'Role not found');
    });
  });

  describe('update', () => {
    it('should update a role and return a 200 success response', async () => {
      req.params.id = '1';
      req.body = { name: 'updated_role' };
      const updatedRole = { id: 1, ...req.body };
      mockRoleService.update.mockResolvedValue(updatedRole);

      await roleController.update(req, res);

      expect(mockRoleService.update).toHaveBeenCalledWith('1', req.body);
      expect(customResponse.success).toHaveBeenCalledWith(res, updatedRole, 'Role updated successfully');
    });

    it('should return a 404 not found response if role to update does not exist', async () => {
      req.params.id = '99';
      mockRoleService.update.mockResolvedValue(null);

      await roleController.update(req, res);

      expect(customResponse.notFound).toHaveBeenCalledWith(res, 'Role not found');
    });
  });

  describe('delete', () => {
    it('should delete a role and return a 204 success response', async () => {
      req.params.id = '1';
      mockRoleService.delete.mockResolvedValue(true);

      await roleController.delete(req, res);

      expect(mockRoleService.delete).toHaveBeenCalledWith('1');
      expect(customResponse.success).toHaveBeenCalledWith(res, null, 'Role deleted successfully', 204);
    });

    it('should return a 404 not found response if role to delete does not exist', async () => {
      req.params.id = '99';
      mockRoleService.delete.mockResolvedValue(false);

      await roleController.delete(req, res);

      expect(customResponse.notFound).toHaveBeenCalledWith(res, 'Role not found');
    });
  });
});
