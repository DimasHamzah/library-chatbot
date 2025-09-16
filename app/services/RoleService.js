/**
 * @class RoleService
 * @description A service layer for handling business logic related to roles.
 */
class RoleService {
  /**
   * @param {RoleRepository} roleRepository - The repository for role data operations.
   * @param {logger} logger - The application logger.
   */
  constructor(roleRepository, logger) {
    this.roleRepository = roleRepository;
    this.logger = logger;
  }

  /**
   * Creates a new role.
   * It logs the action and delegates the creation to the repository.
   * @param {object} roleData - The data for the new role.
   * @returns {Promise<Role>} The newly created Role instance.
   */
  async create(roleData) {
    this.logger.info('Creating a new role', { roleData });
    return await this.roleRepository.create(roleData);
  }

  /**
   * Retrieves all roles.
   * It logs the action and delegates the query to the repository.
   * @returns {Promise<Role[]>} A promise that resolves to an array of Role instances.
   */
  async findAll() {
    this.logger.info('Fetching all roles');
    return await this.roleRepository.findAll();
  }

  /**
   * Finds a single role by its ID.
   * It logs the action and delegates the query to the repository.
   * @param {number} id - The ID of the role to find.
   * @returns {Promise<Role|null>} A promise that resolves to the Role instance if found, otherwise null.
   */
  async findById(id) {
    this.logger.info(`Fetching role with id: ${id}`);
    return await this.roleRepository.findById(id);
  }

  /**
   * Updates an existing role.
   * It logs the action and delegates the update to the repository.
   * @param {number} id - The ID of the role to update.
   * @param {object} roleData - The new data for the role.
   * @returns {Promise<Role|null>} The updated Role instance, or null if the original record was not found.
   */
  async update(id, roleData) {
    this.logger.info(`Updating role with id: ${id}`, { roleData });
    return await this.roleRepository.update(id, roleData);
  }

  /**
   * Deletes a role.
   * It logs the action and delegates the deletion to the repository.
   * @param {number} id - The ID of the role to delete.
   * @returns {Promise<boolean>} A promise that resolves to true if the record was deleted, otherwise false.
   */
  async delete(id) {
    this.logger.info(`Deleting role with id: ${id}`);
    return await this.roleRepository.delete(id);
  }
}

module.exports = RoleService;
