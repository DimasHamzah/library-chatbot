const roleRepository = require('../repositories/RoleRepository');
const logger = require('../utils/logger');

class RoleService {
  async create(roleData) {
    logger.info('Creating a new role', { roleData });
    return await roleRepository.create(roleData);
  }

  async findAll() {
    logger.info('Fetching all roles');
    return await roleRepository.findAll();
  }

  async findById(id) {
    logger.info(`Fetching role with id: ${id}`);
    return await roleRepository.findById(id);
  }

  async update(id, roleData) {
    logger.info(`Updating role with id: ${id}`, { roleData });
    return await roleRepository.update(id, roleData);
  }

  async delete(id) {
    logger.info(`Deleting role with id: ${id}`);
    return await roleRepository.delete(id);
  }
}

module.exports = new RoleService();
