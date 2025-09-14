'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('user_statuses', [
      {
        name: 'active',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'inactive',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'suspended',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('user_statuses', null, {});
  }
};