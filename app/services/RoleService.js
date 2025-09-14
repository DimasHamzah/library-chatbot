const { Role } = require('../db/models');
const logger = require('../utils/logger');

class RoleService {
  async create(roleData) {
    logger.info('Creating a new role', { roleData });
    return await Role.create(roleData);
  }

  async findAll() {
    logger.info('Fetching all roles');
    return await Role.findAll();
  }

  async findById(id) {
    logger.info(`Fetching role with id: ${id}`);
    return await Role.findByPk(id);
  }

  async update(id, roleData) {
    logger.info(`Updating role with id: ${id}`, { roleData });
    const role = await this.findById(id);
    if (role) {
      return await role.update(roleData);
    }
    return null;
  }

  async delete(id) {
    logger.info(`Deleting role with id: ${id}`);
    const role = await this.findById(id);
    if (role) {
      await role.destroy();
      return true;
    }
    return false;
  }
}

module.exports = new RoleService();
