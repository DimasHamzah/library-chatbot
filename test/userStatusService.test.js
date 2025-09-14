const userStatusService = require('../app/services/UserStatusService');
const userStatusRepository = require('../app/repositories/UserStatusRepository');
const logger = require('../app/utils/logger');

// Mock the repository and logger to isolate the service
jest.mock('../app/repositories/UserStatusRepository');
jest.mock('../app/utils/logger');

describe('UserStatusService', () => {
  // Clear all mocks after each test to ensure a clean slate
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('create', () => {
    it('should call repository.create and return the created status', async () => {
      // Arrange
      const statusData = { name: 'new_status' };
      const expectedResult = { id: 1, ...statusData };
      userStatusRepository.create.mockResolvedValue(expectedResult);

      // Act
      const result = await userStatusService.create(statusData);

      // Assert
      expect(userStatusRepository.create).toHaveBeenCalledWith(statusData);
      expect(result).toEqual(expectedResult);
      expect(logger.info).toHaveBeenCalledWith('Creating a new user status', { userStatusData: statusData });
    });
  });

  describe('findAll', () => {
    it('should call repository.findAll and return all statuses', async () => {
      // Arrange
      const expectedResult = [{ id: 1, name: 'active' }, { id: 2, name: 'inactive' }];
      userStatusRepository.findAll.mockResolvedValue(expectedResult);

      // Act
      const result = await userStatusService.findAll();

      // Assert
      expect(userStatusRepository.findAll).toHaveBeenCalledTimes(1);
      expect(result).toEqual(expectedResult);
      expect(logger.info).toHaveBeenCalledWith('Fetching all user statuses');
    });
  });

  describe('findById', () => {
    it('should call repository.findById and return the status', async () => {
      // Arrange
      const expectedResult = { id: 1, name: 'active' };
      userStatusRepository.findById.mockResolvedValue(expectedResult);

      // Act
      const result = await userStatusService.findById(1);

      // Assert
      expect(userStatusRepository.findById).toHaveBeenCalledWith(1);
      expect(result).toEqual(expectedResult);
      expect(logger.info).toHaveBeenCalledWith('Fetching user status with id: 1');
    });
  });

  describe('update', () => {
    it('should call repository.update and return the updated status', async () => {
      // Arrange
      const statusData = { name: 'updated_status' };
      const expectedResult = { id: 1, ...statusData };
      userStatusRepository.update.mockResolvedValue(expectedResult);

      // Act
      const result = await userStatusService.update(1, statusData);

      // Assert
      expect(userStatusRepository.update).toHaveBeenCalledWith(1, statusData);
      expect(result).toEqual(expectedResult);
      expect(logger.info).toHaveBeenCalledWith('Updating user status with id: 1', { userStatusData: statusData });
    });
  });

  describe('delete', () => {
    it('should call repository.delete and return the result', async () => {
      // Arrange
      userStatusRepository.delete.mockResolvedValue(true);

      // Act
      const result = await userStatusService.delete(1);

      // Assert
      expect(userStatusRepository.delete).toHaveBeenCalledWith(1);
      expect(result).toBe(true);
      expect(logger.info).toHaveBeenCalledWith('Deleting user status with id: 1');
    });
  });
});
