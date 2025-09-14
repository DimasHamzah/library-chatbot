const request = require('supertest');

// NOTE: We will require app and other modules inside beforeEach to ensure isolation

describe('Roles API', () => {
  let app;
  let Role;
  let roleService;

  beforeEach(() => {
    jest.resetModules();

    jest.mock('../app/db/models', () => ({
      Role: { findOne: jest.fn() },
      UserStatus: { findOne: jest.fn() },
    }));
    jest.mock('../app/services/RoleService');

    app = require('../app');
    Role = require('../app/db/models').Role;
    roleService = require('../app/services/RoleService');
  });

  // Use resetAllMocks to clear implementations between tests
  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('POST /roles', () => {
    it('should create a new role and return 201', async () => {
      Role.findOne.mockResolvedValue(null);
      roleService.create.mockResolvedValue({ id: 1, name: 'new_role' });

      const res = await request(app).post('/roles').send({ name: 'new_role' });

      expect(res.statusCode).toEqual(201);
      expect(res.body.data.name).toBe('new_role');
    });

    it('should return 400 if name is missing', async () => {
      const res = await request(app).post('/roles').send({});
      expect(res.statusCode).toEqual(400);
      expect(res.body.message).toBe('Role name is required');
    });

    it('should return 400 if name is not a string', async () => {
      const res = await request(app).post('/roles').send({ name: 123 });
      expect(res.statusCode).toEqual(400);
      expect(res.body.message).toBe('Role name must be a string');
    });

    it('should return 400 if name is already in use', async () => {
      Role.findOne.mockResolvedValue({ id: 2, name: 'existing_role' });
      const res = await request(app).post('/roles').send({ name: 'existing_role' });
      expect(res.statusCode).toEqual(400);
      expect(res.body.message).toBe('Role name already in use');
    });
  });

  // ... (rest of the tests are unchanged)
  describe('GET /roles', () => {
    it('should return all roles and 200', async () => {
      roleService.findAll.mockResolvedValue([{ id: 1, name: 'admin' }]);
      const res = await request(app).get('/roles');
      expect(res.statusCode).toEqual(200);
    });
  });

  describe('GET /roles/:id', () => {
    it('should return a single role and 200', async () => {
      roleService.findById.mockResolvedValue({ id: 1, name: 'admin' });
      const res = await request(app).get('/roles/1');
      expect(res.statusCode).toEqual(200);
    });

    it('should return 404 if role not found', async () => {
      roleService.findById.mockResolvedValue(null);
      const res = await request(app).get('/roles/99');
      expect(res.statusCode).toEqual(404);
    });
  });

  describe('PUT /roles/:id', () => {
    it('should update a role and return 200', async () => {
      Role.findOne.mockResolvedValue(null);
      roleService.update.mockResolvedValue({ id: 1, name: 'updated_role' });
      const res = await request(app).put('/roles/1').send({ name: 'updated_role' });
      expect(res.statusCode).toEqual(200);
    });

    it('should return 404 if role to update not found', async () => {
      Role.findOne.mockResolvedValue(null);
      roleService.update.mockResolvedValue(null);
      const res = await request(app).put('/roles/99').send({ name: 'non_existent' });
      expect(res.statusCode).toEqual(404);
    });
  });

  describe('DELETE /roles/:id', () => {
    it('should delete a role and return 204', async () => {
      roleService.delete.mockResolvedValue(true);
      const res = await request(app).delete('/roles/1');
      expect(res.statusCode).toEqual(204);
    });

    it('should return 404 if role to delete not found', async () => {
      roleService.delete.mockResolvedValue(false);
      const res = await request(app).delete('/roles/99');
      expect(res.statusCode).toEqual(404);
    });
  });
});
