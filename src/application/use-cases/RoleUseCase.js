const Role = require('../../domain/Role');

class RoleUseCase {
  constructor(roleRepository) {
    this.roleRepository = roleRepository;
  }

  async createRole(roleData) {
    const role = new Role(null, roleData.name);
    return await this.roleRepository.create(role);
  }

  async getAllRoles() {
    return await this.roleRepository.findAll();
  }

  async getRoleById(id) {
    return await this.roleRepository.findById(id);
  }

  async updateRole(id, roleData) {
    const role = new Role(id, roleData.name);
    return await this.roleRepository.update(id, role);
  }

  async deleteRole(id) {
    return await this.roleRepository.delete(id);
  }
}

module.exports = RoleUseCase;
