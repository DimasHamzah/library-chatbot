const RoleRepository = require('../../app/repositories/RoleRepository');
const { Role } = require('../../app/db/models');

// Mock the Role model to isolate the repository
jest.mock('../../app/db/models', () => ({
  Role: {
    create: jest.fn(),
    findAll: jest.fn(),
    findByPk: jest.fn(),
  },
}));

describe('RoleRepository', () => {
  let roleRepository;

  // Before each test, create a new instance of the repository
  beforeEach(() => {
    roleRepository = new RoleRepository();
    jest.clearAllMocks();
  });

  describe('create', () => {
    it('should call Role.create with the correct data', async () => {
      const roleData = { name: 'new_role' };
      const expectedResult = { id: 1, ...roleData };
      Role.create.mockResolvedValue(expectedResult);

      const result = await roleRepository.create(roleData);

      expect(Role.create).toHaveBeenCalledWith(roleData);
      expect(result).toEqual(expectedResult);
    });
  });

  describe('findAll', () => {
    it('should call Role.findAll and return the result', async () => {
      const expectedResult = [{ id: 1, name: 'admin' }];
      Role.findAll.mockResolvedValue(expectedResult);

      const result = await roleRepository.findAll();

      expect(Role.findAll).toHaveBeenCalledTimes(1);
      expect(result).toEqual(expectedResult);
    });
  });

  describe('findById', () => {
    it('should call Role.findByPk with the correct id', async () => {
      const expectedResult = { id: 1, name: 'admin' };
      Role.findByPk.mockResolvedValue(expectedResult);

      const result = await roleRepository.findById(1);

      expect(Role.findByPk).toHaveBeenCalledWith(1);
      expect(result).toEqual(expectedResult);
    });
  });

  describe('update', () => {
    it('should find a role, call its update method, and return the result', async () => {
      const roleData = { name: 'updated_role' };
      const mockRoleInstance = { update: jest.fn().mockResolvedValue({ id: 1, ...roleData }) };
      Role.findByPk.mockResolvedValue(mockRoleInstance);

      const result = await roleRepository.update(1, roleData);

      expect(Role.findByPk).toHaveBeenCalledWith(1);
      expect(mockRoleInstance.update).toHaveBeenCalledWith(roleData);
      expect(result).toEqual({ id: 1, ...roleData });
    });

    it('should return null if the role is not found', async () => {
      Role.findByPk.mockResolvedValue(null);
      const result = await roleRepository.update(99, { name: 'non_existent' });
      expect(result).toBeNull();
    });
  });

  describe('delete', () => {
    it('should find a role and call its destroy method', async () => {
      const mockRoleInstance = { destroy: jest.fn().mockResolvedValue(true) };
      Role.findByPk.mockResolvedValue(mockRoleInstance);

      const result = await roleRepository.delete(1);

      expect(Role.findByPk).toHaveBeenCalledWith(1);
      expect(mockRoleInstance.destroy).toHaveBeenCalledTimes(1);
      expect(result).toBe(true);
    });

    it('should return false if the role is not found', async () => {
      Role.findByPk.mockResolvedValue(null);
      const result = await roleRepository.delete(99);
      expect(result).toBe(false);
    });
  });
});
