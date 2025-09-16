const UserStatusRepository = require('../../app/repositories/UserStatusRepository');
const { UserStatus } = require('../../app/db/models');

// Mock the UserStatus model to isolate the repository
jest.mock('../../app/db/models', () => ({
  UserStatus: {
    create: jest.fn(),
    findAll: jest.fn(),
    findByPk: jest.fn(),
  },
}));

describe('UserStatusRepository', () => {
  let userStatusRepository;

  // Before each test, create a new instance of the repository
  beforeEach(() => {
    userStatusRepository = new UserStatusRepository();
    jest.clearAllMocks();
  });

  describe('create', () => {
    it('should call UserStatus.create with the correct data', async () => {
      const statusData = { name: 'new_status' };
      const expectedResult = { id: 1, ...statusData };
      UserStatus.create.mockResolvedValue(expectedResult);

      const result = await userStatusRepository.create(statusData);

      expect(UserStatus.create).toHaveBeenCalledWith(statusData);
      expect(result).toEqual(expectedResult);
    });
  });

  describe('findAll', () => {
    it('should call UserStatus.findAll and return the result', async () => {
      const expectedResult = [{ id: 1, name: 'active' }];
      UserStatus.findAll.mockResolvedValue(expectedResult);

      const result = await userStatusRepository.findAll();

      expect(UserStatus.findAll).toHaveBeenCalledTimes(1);
      expect(result).toEqual(expectedResult);
    });
  });

  describe('findById', () => {
    it('should call UserStatus.findByPk with the correct id', async () => {
      const expectedResult = { id: 1, name: 'active' };
      UserStatus.findByPk.mockResolvedValue(expectedResult);

      const result = await userStatusRepository.findById(1);

      expect(UserStatus.findByPk).toHaveBeenCalledWith(1);
      expect(result).toEqual(expectedResult);
    });
  });

  describe('update', () => {
    it('should find a status, call its update method, and return the result', async () => {
      const statusData = { name: 'updated_status' };
      const mockStatusInstance = { update: jest.fn().mockResolvedValue({ id: 1, ...statusData }) };
      UserStatus.findByPk.mockResolvedValue(mockStatusInstance);

      const result = await userStatusRepository.update(1, statusData);

      expect(UserStatus.findByPk).toHaveBeenCalledWith(1);
      expect(mockStatusInstance.update).toHaveBeenCalledWith(statusData);
      expect(result).toEqual({ id: 1, ...statusData });
    });

    it('should return null if the status is not found', async () => {
      UserStatus.findByPk.mockResolvedValue(null);
      const result = await userStatusRepository.update(99, { name: 'non_existent' });
      expect(result).toBeNull();
    });
  });

  describe('delete', () => {
    it('should find a status and call its destroy method', async () => {
      const mockStatusInstance = { destroy: jest.fn().mockResolvedValue(true) };
      UserStatus.findByPk.mockResolvedValue(mockStatusInstance);

      const result = await userStatusRepository.delete(1);

      expect(UserStatus.findByPk).toHaveBeenCalledWith(1);
      expect(mockStatusInstance.destroy).toHaveBeenCalledTimes(1);
      expect(result).toBe(true);
    });

    it('should return false if the status is not found', async () => {
      UserStatus.findByPk.mockResolvedValue(null);
      const result = await userStatusRepository.delete(99);
      expect(result).toBe(false);
    });
  });
});
