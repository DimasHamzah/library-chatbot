const request = require('supertest');
const app = require('../../app');
const { sequelize, Role } = require('../../app/db/models');

// ---- E2E TEST SUITE FOR /roles ----

describe('Roles API End-to-End Tests', () => {

  // Before all tests, connect to the database.
  // We will no longer use force: true to prevent race conditions.
  // It is assumed the test database is migrated before running tests.
  beforeAll(async () => {
    await sequelize.sync();
  });

  // After each test, truncate the table to ensure test isolation.
  afterEach(async () => {
    await Role.destroy({ truncate: true, cascade: true });
  });

  // After all tests are complete, close the database connection.
  afterAll(async () => {
    await sequelize.close();
  });

  describe('POST /roles', () => {
    it('should create a new role in the database and return 201', async () => {
      const res = await request(app)
        .post('/roles')
        .send({ name: 'e2e_tester' });

      expect(res.statusCode).toEqual(201);
      expect(res.body.data.name).toBe('e2e_tester');

      const newRoleInDb = await Role.findOne({ where: { name: 'e2e_tester' } });
      expect(newRoleInDb).not.toBeNull();
    });

    it('should fail to create a role if validation fails', async () => {
      const res = await request(app)
        .post('/roles')
        .send({ name: 123 }); // Invalid data

      expect(res.statusCode).toEqual(400);
      const count = await Role.count();
      expect(count).toEqual(0);
    });
  });

  describe('GET /roles', () => {
    it('should retrieve all roles from the database', async () => {
      await Role.create({ name: 'role1' });
      await Role.create({ name: 'role2' });

      const res = await request(app).get('/roles');

      expect(res.statusCode).toEqual(200);
      expect(res.body.data.length).toBe(2);
    });
  });

  describe('PUT /roles/:id', () => {
    it('should update a role in the database and return 200', async () => {
      const role = await Role.create({ name: 'to_be_updated' });

      const res = await request(app)
        .put(`/roles/${role.id}`)
        .send({ name: 'now_updated' });

      expect(res.statusCode).toEqual(200);
      const updatedRoleFromDb = await Role.findByPk(role.id);
      expect(updatedRoleFromDb.name).toBe('now_updated');
    });
  });

  describe('DELETE /roles/:id', () => {
    it('should delete a role from the database and return 204', async () => {
      const role = await Role.create({ name: 'to_be_deleted' });

      const res = await request(app).delete(`/roles/${role.id}`);

      expect(res.statusCode).toEqual(204);
      const deletedRoleFromDb = await Role.findByPk(role.id);
      expect(deletedRoleFromDb).toBeNull();
    });
  });
});
