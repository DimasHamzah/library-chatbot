'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class UserStatus extends Model {
    static associate(models) {
      // define association here
    }
  }
  UserStatus.init(
    {
      name: {
        type: DataTypes.STRING,
        unique: true
      },
    },
    {
      sequelize,
      modelName: 'UserStatus',
      tableName: 'user_statuses',
    }
  );
  return UserStatus;
};