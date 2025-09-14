'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Role extends Model {
    static associate(models) {
      // define association here
    }
  }
  Role.init(
    {
      name: {
        type: DataTypes.STRING,
        unique: true
      },
    },
    {
      sequelize,
      modelName: 'Role',
      tableName: 'roles',
    }
  );
  return Role;
};