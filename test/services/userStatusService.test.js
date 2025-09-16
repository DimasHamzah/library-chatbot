const UserStatusService = require('../../app/services/UserStatusService');
const UserStatusRepository = require('../../app/repositories/UserStatusRepository');
const logger = require('../../app/utils/logger');

// Mock the repository and logger classes
jest.mock('../../app/repositories/UserStatusRepository');
jest.mock('../../app/utils/logger');

describe('UserStatusService', () => {
  let userStatusService;
  let mockUserStatusRepository;

  beforeEach(() => {
    // Create a new mock instance for the repository before each test
    mockUserStatusRepository = new UserStatusRepository();
    // Create a new service instance, injecting the mock repository and logger
    userStatusService = new UserStatusService(mockUserStatusRepository, logger);
    jest.clearAllMocks();
  });

  describe('create', () => {
    it('should call repository.create and return the created status', async () => {
      const statusData = { name: 'new_status' };
      const expectedResult = { id: 1, ...statusData };
      mockUserStatusRepository.create.mockResolvedValue(expectedResult);

      const result = await userStatusService.create(statusData);

      expect(mockUserStatusRepository.create).toHaveBeenCalledWith(statusData);
      expect(result).toEqual(expectedResult);
    });
  });

  describe('findAll', () => {
    it('should call repository.findAll and return all statuses', async () => {
      const expectedResult = [{ id: 1, name: 'active' }];
      mockUserStatusRepository.findAll.mockResolvedValue(expectedResult);

      const result = await userStatusService.findAll();

      expect(mockUserStatusRepository.findAll).toHaveBeenCalledTimes(1);
      expect(result).toEqual(expectedResult);
    });
  });

  describe('findById', () => {
    it('should call repository.findById and return the status', async () => {
      const expectedResult = { id: 1, name: 'active' };
      mockUserStatusRepository.findById.mockResolvedValue(expectedResult);

      const result = await userStatusService.findById(1);

      expect(mockUserStatusRepository.findById).toHaveBeenCalledWith(1);
      expect(result).toEqual(expectedResult);
    });
  });

  describe('update', () => {
    it('should call repository.update and return the updated status', async () => {
      const statusData = { name: 'updated_status' };
      const expectedResult = { id: 1, ...statusData };
      mockUserStatusRepository.update.mockResolvedValue(expectedResult);

      const result = await userStatusService.update(1, statusData);

      expect(mockUserStatusRepository.update).toHaveBeenCalledWith(1, statusData);
      expect(result).toEqual(expectedResult);
    });
  });

  describe('delete', () => {
    it('should call repository.delete and return the result', async () => {
      mockUserStatusRepository.delete.mockResolvedValue(true);
      const result = await userStatusService.delete(1);
      expect(mockUserStatusRepository.delete).toHaveBeenCalledWith(1);
      expect(result).toBe(true);
    });
  });
});
