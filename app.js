const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const RoleUseCase = require('./src/application/use-cases/RoleUseCase');
const SequelizeRoleRepository = require('./src/infrastructure/repositories/SequelizeRoleRepository');
const roleRouter = require('./src/presentation/routes/role');

const app = express();

// Instantiate repository and use case
const roleRepository = new SequelizeRoleRepository();
const roleUseCase = new RoleUseCase(roleRepository);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/roles', roleRouter(roleUseCase));

module.exports = app;
