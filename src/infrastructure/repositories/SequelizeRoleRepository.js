const RoleRepository = require('../../application/repositories/RoleRepository');
const { Role } = require('../database/models');

class SequelizeRoleRepository extends RoleRepository {
  async create(roleData) {
    return await Role.create(roleData);
  }

  async findAll() {
    return await Role.findAll();
  }

  async findById(id) {
    return await Role.findByPk(id);
  }

  async update(id, roleData) {
    const role = await Role.findByPk(id);
    if (role) {
      return await role.update(roleData);
    }
    return null;
  }

  async delete(id) {
    const role = await Role.findByPk(id);
    if (role) {
      await role.destroy();
      return true;
    }
    return false;
  }
}

module.exports = SequelizeRoleRepository;
