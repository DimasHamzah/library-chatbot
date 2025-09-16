const { UserStatus } = require('../db/models');

/**
 * @class UserStatusRepository
 * @description A repository for handling database operations for the UserStatus model.
 */
class UserStatusRepository {

  /**
   * Creates a new user status record in the database.
   * @param {object} userStatusData - The data for the new user status.
   * @returns {Promise<UserStatus>} The newly created UserStatus instance.
   */
  async create(userStatusData) {
    return await UserStatus.create(userStatusData);
  }

  /**
   * Retrieves all user status records from the database.
   * @returns {Promise<UserStatus[]>} A promise that resolves to an array of UserStatus instances.
   */
  async findAll() {
    return await UserStatus.findAll();
  }

  /**
   * Finds a single user status record by its primary key.
   * @param {number} id - The ID of the user status to find.
   * @returns {Promise<UserStatus|null>} A promise that resolves to the UserStatus instance if found, otherwise null.
   */
  async findById(id) {
    return await UserStatus.findByPk(id);
  }

  /**
   * Updates an existing user status record in the database.
   * @param {number} id - The ID of the user status to update.
   * @param {object} userStatusData - The new data for the user status.
   * @returns {Promise<UserStatus|null>} The updated UserStatus instance, or null if the original record was not found.
   */
  async update(id, userStatusData) {
    const userStatus = await this.findById(id);
    if (userStatus) {
      return await userStatus.update(userStatusData);
    }
    return null;
  }

  /**
   * Deletes a user status record from the database.
   * @param {number} id - The ID of the user status to delete.
   * @returns {Promise<boolean>} A promise that resolves to true if the record was deleted, otherwise false.
   */
  async delete(id) {
    const userStatus = await this.findById(id);
    if (userStatus) {
      await userStatus.destroy();
      return true;
    }
    return false;
  }
}

module.exports = UserStatusRepository;
