const userStatusRepository = require('../../app/repositories/UserStatusRepository');
const { UserStatus } = require('../../app/db/models');

// Mock the UserStatus model to isolate the repository
// We only need to mock the parts of the module that are used by the repository
jest.mock('../../app/db/models', () => ({
  UserStatus: {
    create: jest.fn(),
    findAll: jest.fn(),
    findByPk: jest.fn(),
    // Note: `update` and `destroy` are instance methods, so we test them differently
  },
}));

describe('UserStatusRepository', () => {
  // Reset mocks after each test to ensure a clean state
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('create', () => {
    it('should call UserStatus.create with the correct data and return the result', async () => {
      // Arrange
      const statusData = { name: 'new_status' };
      const expectedResult = { id: 1, ...statusData };
      UserStatus.create.mockResolvedValue(expectedResult);

      // Act
      const result = await userStatusRepository.create(statusData);

      // Assert
      expect(UserStatus.create).toHaveBeenCalledWith(statusData);
      expect(result).toEqual(expectedResult);
    });
  });

  describe('findAll', () => {
    it('should call UserStatus.findAll and return the result', async () => {
      // Arrange
      const expectedResult = [{ id: 1, name: 'active' }];
      UserStatus.findAll.mockResolvedValue(expectedResult);

      // Act
      const result = await userStatusRepository.findAll();

      // Assert
      expect(UserStatus.findAll).toHaveBeenCalledTimes(1);
      expect(result).toEqual(expectedResult);
    });
  });

  describe('findById', () => {
    it('should call UserStatus.findByPk with the correct id', async () => {
      // Arrange
      const expectedResult = { id: 1, name: 'active' };
      UserStatus.findByPk.mockResolvedValue(expectedResult);

      // Act
      const result = await userStatusRepository.findById(1);

      // Assert
      expect(UserStatus.findByPk).toHaveBeenCalledWith(1);
      expect(result).toEqual(expectedResult);
    });
  });

  describe('update', () => {
    it('should find a status, call its update method, and return the result', async () => {
      // Arrange
      const statusData = { name: 'updated_status' };
      const mockStatusInstance = {
        update: jest.fn().mockResolvedValue({ id: 1, ...statusData }),
      };
      UserStatus.findByPk.mockResolvedValue(mockStatusInstance);

      // Act
      const result = await userStatusRepository.update(1, statusData);

      // Assert
      expect(UserStatus.findByPk).toHaveBeenCalledWith(1);
      expect(mockStatusInstance.update).toHaveBeenCalledWith(statusData);
      expect(result).toEqual({ id: 1, ...statusData });
    });

    it('should return null if the status to update is not found', async () => {
      // Arrange
      UserStatus.findByPk.mockResolvedValue(null);

      // Act
      const result = await userStatusRepository.update(99, { name: 'non_existent' });

      // Assert
      expect(UserStatus.findByPk).toHaveBeenCalledWith(99);
      expect(result).toBeNull();
    });
  });

  describe('delete', () => {
    it('should find a status and call its destroy method', async () => {
      // Arrange
      const mockStatusInstance = {
        destroy: jest.fn().mockResolvedValue(true),
      };
      UserStatus.findByPk.mockResolvedValue(mockStatusInstance);

      // Act
      const result = await userStatusRepository.delete(1);

      // Assert
      expect(UserStatus.findByPk).toHaveBeenCalledWith(1);
      expect(mockStatusInstance.destroy).toHaveBeenCalledTimes(1);
      expect(result).toBe(true);
    });

    it('should return false if the status to delete is not found', async () => {
        // Arrange
        UserStatus.findByPk.mockResolvedValue(null);
  
        // Act
        const result = await userStatusRepository.delete(99);
  
        // Assert
        expect(UserStatus.findByPk).toHaveBeenCalledWith(99);
        expect(result).toBe(false);
      });
  });
});
