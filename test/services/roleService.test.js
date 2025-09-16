const RoleService = require('../../app/services/RoleService');
const RoleRepository = require('../../app/repositories/RoleRepository');
const logger = require('../../app/utils/logger');

// Mock the repository and logger classes
jest.mock('../../app/repositories/RoleRepository');
jest.mock('../../app/utils/logger');

describe('RoleService', () => {
  let roleService;
  let mockRoleRepository;

  beforeEach(() => {
    // Create a new mock instance for the repository before each test
    mockRoleRepository = new RoleRepository();
    // Create a new service instance, injecting the mock repository and logger
    roleService = new RoleService(mockRoleRepository, logger);
    jest.clearAllMocks();
  });

  describe('create', () => {
    it('should call repository.create and return the created role', async () => {
      const roleData = { name: 'new_role' };
      const expectedResult = { id: 1, ...roleData };
      mockRoleRepository.create.mockResolvedValue(expectedResult);

      const result = await roleService.create(roleData);

      expect(mockRoleRepository.create).toHaveBeenCalledWith(roleData);
      expect(result).toEqual(expectedResult);
    });
  });

  describe('findAll', () => {
    it('should call repository.findAll and return all roles', async () => {
      const expectedResult = [{ id: 1, name: 'admin' }];
      mockRoleRepository.findAll.mockResolvedValue(expectedResult);

      const result = await roleService.findAll();

      expect(mockRoleRepository.findAll).toHaveBeenCalledTimes(1);
      expect(result).toEqual(expectedResult);
    });
  });

  describe('findById', () => {
    it('should call repository.findById and return the role', async () => {
      const expectedResult = { id: 1, name: 'admin' };
      mockRoleRepository.findById.mockResolvedValue(expectedResult);

      const result = await roleService.findById(1);

      expect(mockRoleRepository.findById).toHaveBeenCalledWith(1);
      expect(result).toEqual(expectedResult);
    });
  });

  describe('update', () => {
    it('should call repository.update and return the updated role', async () => {
      const roleData = { name: 'updated_role' };
      const expectedResult = { id: 1, ...roleData };
      mockRoleRepository.update.mockResolvedValue(expectedResult);

      const result = await roleService.update(1, roleData);

      expect(mockRoleRepository.update).toHaveBeenCalledWith(1, roleData);
      expect(result).toEqual(expectedResult);
    });
  });

  describe('delete', () => {
    it('should call repository.delete and return the result', async () => {
      mockRoleRepository.delete.mockResolvedValue(true);
      const result = await roleService.delete(1);
      expect(mockRoleRepository.delete).toHaveBeenCalledWith(1);
      expect(result).toBe(true);
    });
  });
});
