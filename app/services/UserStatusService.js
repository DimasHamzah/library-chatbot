/**
 * @class UserStatusService
 * @description A service layer for handling business logic related to user statuses.
 */
class UserStatusService {

  /**
   * @param {UserStatusRepository} userStatusRepository - The repository for user status data operations.
   * @param {logger} logger - The application logger.
   */
  constructor(userStatusRepository, logger) {
    this.userStatusRepository = userStatusRepository;
    this.logger = logger;
  }

  /**
   * Creates a new user status.
   * It logs the action and delegates the creation to the repository.
   * @param {object} userStatusData - The data for the new user status.
   * @returns {Promise<UserStatus>} The newly created UserStatus instance.
   */
  async create(userStatusData) {
    this.logger.info('Creating a new user status', { userStatusData });
    return await this.userStatusRepository.create(userStatusData);
  }

  /**
   * Retrieves all user statuses.
   * It logs the action and delegates the query to the repository.
   * @returns {Promise<UserStatus[]>} A promise that resolves to an array of UserStatus instances.
   */
  async findAll() {
    this.logger.info('Fetching all user statuses');
    return await this.userStatusRepository.findAll();
  }

  /**
   * Finds a single user status by its ID.
   * It logs the action and delegates the query to the repository.
   * @param {number} id - The ID of the user status to find.
   * @returns {Promise<UserStatus|null>} A promise that resolves to the UserStatus instance if found, otherwise null.
   */
  async findById(id) {
    this.logger.info(`Fetching user status with id: ${id}`);
    return await this.userStatusRepository.findById(id);
  }

  /**
   * Updates an existing user status.
   * It logs the action and delegates the update to the repository.
   * @param {number} id - The ID of the user status to update.
   * @param {object} userStatusData - The new data for the user status.
   * @returns {Promise<UserStatus|null>} The updated UserStatus instance, or null if the original record was not found.
   */
  async update(id, userStatusData) {
    this.logger.info(`Updating user status with id: ${id}`, { userStatusData });
    return await this.userStatusRepository.update(id, userStatusData);
  }

  /**
   * Deletes a user status.
   * It logs the action and delegates the deletion to the repository.
   * @param {number} id - The ID of the user status to delete.
   * @returns {Promise<boolean>} A promise that resolves to true if the record was deleted, otherwise false.
   */
  async delete(id) {
    this.logger.info(`Deleting user status with id: ${id}`);
    return await this.userStatusRepository.delete(id);
  }
}

module.exports = UserStatusService;
