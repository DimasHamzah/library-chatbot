// Import all the classes and utilities
const RoleRepository = require('./repositories/RoleRepository');
const RoleService = require('./services/RoleService');
const RoleController = require('./controllers/RoleController');

const UserStatusRepository = require('./repositories/UserStatusRepository');
const UserStatusService = require('./services/UserStatusService');
const UserStatusController = require('./controllers/UserStatusController');

const logger = require('./utils/logger');
const customResponse = require('./utils/customResponse');

// ---- Composition Root ----
// This is the central place where we create and wire together our application's components.

// 1. Create instances of low-level dependencies (repositories)
const roleRepository = new RoleRepository();
const userStatusRepository = new UserStatusRepository();

// 2. Create instances of services, injecting their dependencies
const roleService = new RoleService(roleRepository, logger);
const userStatusService = new UserStatusService(userStatusRepository, logger);

// 3. Create instances of controllers, injecting their dependencies
const roleController = new RoleController(roleService, logger, customResponse);
const userStatusController = new UserStatusController(userStatusService, logger, customResponse);

// 4. Export the fully constructed controllers so the routes can use them
module.exports = {
  roleController,
  userStatusController,
};
