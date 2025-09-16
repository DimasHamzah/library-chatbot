const roleController = require('../../app/controllers/RoleController');
const roleService = require('../../app/services/RoleService');
const customResponse = require('../../app/utils/customResponse');
const logger = require('../../app/utils/logger');

// Mock all dependencies of the controller
jest.mock('../../app/services/RoleService');
jest.mock('../../app/utils/customResponse');
jest.mock('../../app/utils/logger');

// Create mock request and response objects for each test
let req, res;

beforeEach(() => {
  jest.clearAllMocks();
  req = { body: {}, params: {} };
  res = { status: jest.fn().mockReturnThis(), json: jest.fn().mockReturnThis() };
});

describe('RoleController Unit Tests', () => {

  describe('create', () => {
    it('should log info, call service, and return a 201 success response', async () => {
      req.body = { name: 'new_role' };
      const newRole = { id: 1, ...req.body };
      roleService.create.mockResolvedValue(newRole);

      await roleController.create(req, res);

      expect(logger.info).toHaveBeenCalledWith('POST /roles - creating a new role', { body: req.body });
      expect(roleService.create).toHaveBeenCalledWith(req.body);
      expect(logger.info).toHaveBeenCalledWith('Successfully created a new role', { role: newRole });
      expect(customResponse.success).toHaveBeenCalledWith(res, newRole, 'Role created successfully', 201);
    });

    it('should log error and return a 500 response on service failure', async () => {
      req.body = { name: 'new_role' };
      const error = new Error('Database failure');
      roleService.create.mockRejectedValue(error);

      await roleController.create(req, res);

      expect(logger.error).toHaveBeenCalledWith('Error creating a new role', { error: error.message });
      expect(customResponse.error).toHaveBeenCalledWith(res, error.message);
    });
  });

  describe('findAll', () => {
    it('should log info, fetch all roles, and return a 200 success response', async () => {
      const roles = [{ id: 1, name: 'admin' }];
      roleService.findAll.mockResolvedValue(roles);

      await roleController.findAll(req, res);

      expect(logger.info).toHaveBeenCalledWith('GET /roles - fetching all roles');
      expect(roleService.findAll).toHaveBeenCalled();
      expect(logger.info).toHaveBeenCalledWith('Successfully fetched all roles');
      expect(customResponse.success).toHaveBeenCalledWith(res, roles, 'Roles fetched successfully');
    });
  });

  describe('findById', () => {
    it('should log info, fetch a role, and return a 200 success response', async () => {
      req.params.id = '1';
      const role = { id: 1, name: 'admin' };
      roleService.findById.mockResolvedValue(role);

      await roleController.findById(req, res);

      expect(logger.info).toHaveBeenCalledWith('GET /roles/1 - fetching role by id');
      expect(roleService.findById).toHaveBeenCalledWith('1');
      expect(logger.info).toHaveBeenCalledWith('Successfully fetched role with id: 1');
      expect(customResponse.success).toHaveBeenCalledWith(res, role, 'Role fetched successfully');
    });

    it('should log a warning and return a 404 response if role is not found', async () => {
      req.params.id = '99';
      roleService.findById.mockResolvedValue(null);

      await roleController.findById(req, res);

      expect(logger.warn).toHaveBeenCalledWith('Role with id: 99 not found');
      expect(customResponse.notFound).toHaveBeenCalledWith(res, 'Role not found');
    });
  });

  describe('update', () => {
    it('should log info, update a role, and return a 200 success response', async () => {
      req.params.id = '1';
      req.body = { name: 'updated_role' };
      const updatedRole = { id: 1, ...req.body };
      roleService.update.mockResolvedValue(updatedRole);

      await roleController.update(req, res);

      expect(logger.info).toHaveBeenCalledWith('PUT /roles/1 - updating role by id', { body: req.body });
      expect(roleService.update).toHaveBeenCalledWith('1', req.body);
      expect(logger.info).toHaveBeenCalledWith('Successfully updated role with id: 1');
      expect(customResponse.success).toHaveBeenCalledWith(res, updatedRole, 'Role updated successfully');
    });

    it('should log a warning and return a 404 response if role to update is not found', async () => {
      req.params.id = '99';
      roleService.update.mockResolvedValue(null);

      await roleController.update(req, res);

      expect(logger.warn).toHaveBeenCalledWith('Role with id: 99 not found for update');
      expect(customResponse.notFound).toHaveBeenCalledWith(res, 'Role not found');
    });
  });

  describe('delete', () => {
    it('should log info, delete a role, and return a 204 success response', async () => {
      req.params.id = '1';
      roleService.delete.mockResolvedValue(true);

      await roleController.delete(req, res);

      expect(logger.info).toHaveBeenCalledWith('DELETE /roles/1 - deleting role by id');
      expect(roleService.delete).toHaveBeenCalledWith('1');
      expect(logger.info).toHaveBeenCalledWith('Successfully deleted role with id: 1');
      expect(customResponse.success).toHaveBeenCalledWith(res, null, 'Role deleted successfully', 204);
    });

    it('should log a warning and return a 404 response if role to delete is not found', async () => {
      req.params.id = '99';
      roleService.delete.mockResolvedValue(false);

      await roleController.delete(req, res);

      expect(logger.warn).toHaveBeenCalledWith('Role with id: 99 not found for deletion');
      expect(customResponse.notFound).toHaveBeenCalledWith(res, 'Role not found');
    });
  });
});
