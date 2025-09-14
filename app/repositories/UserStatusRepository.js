const { UserStatus } = require('../db/models');

class UserStatusRepository {
  async create(userStatusData) {
    return await UserStatus.create(userStatusData);
  }

  async findAll() {
    return await UserStatus.findAll();
  }

  async findById(id) {
    return await UserStatus.findByPk(id);
  }

  async update(id, userStatusData) {
    const userStatus = await this.findById(id);
    if (userStatus) {
      return await userStatus.update(userStatusData);
    }
    return null;
  }

  async delete(id) {
    const userStatus = await this.findById(id);
    if (userStatus) {
      await userStatus.destroy();
      return true;
    }
    return false;
  }
}

module.exports = new UserStatusRepository();
