const { Role } = require('../db/models');

/**
 * @class RoleRepository
 * @description A repository for handling database operations for the Role model.
 */
class RoleRepository {

  /**
   * Creates a new role record in the database.
   * @param {object} roleData - The data for the new role.
   * @returns {Promise<Role>} The newly created Role instance.
   */
  async create(roleData) {
    return await Role.create(roleData);
  }

  /**
   * Retrieves all role records from the database.
   * @returns {Promise<Role[]>} A promise that resolves to an array of Role instances.
   */
  async findAll() {
    return await Role.findAll();
  }

  /**
   * Finds a single role record by its primary key.
   * @param {number} id - The ID of the role to find.
   * @returns {Promise<Role|null>} A promise that resolves to the Role instance if found, otherwise null.
   */
  async findById(id) {
    return await Role.findByPk(id);
  }

  /**
   * Updates an existing role record in the database.
   * @param {number} id - The ID of the role to update.
   * @param {object} roleData - The new data for the role.
   * @returns {Promise<Role|null>} The updated Role instance, or null if the original record was not found.
   */
  async update(id, roleData) {
    const role = await this.findById(id);
    if (role) {
      return await role.update(roleData);
    }
    return null;
  }

  /**
   * Deletes a role record from the database.
   * @param {number} id - The ID of the role to delete.
   * @returns {Promise<boolean>} A promise that resolves to true if the record was deleted, otherwise false.
   */
  async delete(id) {
    const role = await this.findById(id);
    if (role) {
      await role.destroy();
      return true;
    }
    return false;
  }
}

module.exports = RoleRepository;
