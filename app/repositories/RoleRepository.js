const { Role } = require('../db/models');

class RoleRepository {
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
    const role = await this.findById(id);
    if (role) {
      return await role.update(roleData);
    }
    return null;
  }

  async delete(id) {
    const role = await this.findById(id);
    if (role) {
      await role.destroy();
      return true;
    }
    return false;
  }
}

module.exports = new RoleRepository();
