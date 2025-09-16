const request = require('supertest');
const app = require('../../app');
const { sequelize, Role } = require('../../app/db/models');

// ---- E2E TEST SUITE FOR /roles ----

describe('Roles API End-to-End Tests', () => {

  // Before all tests, connect to the database and recreate the schema
  // This ensures a clean slate for the entire test suite.
  beforeAll(async () => {
    // { force: true } will drop all tables and recreate them
    await sequelize.sync({ force: true });
  });

  // After each test, truncate all tables to ensure test isolation.
  // This is faster than dropping and recreating tables for every single test.
  afterEach(async () => {
    await Role.destroy({ truncate: true });
  });

  // After all tests are complete, close the database connection.
  // This is crucial to prevent Jest from hanging.
  afterAll(async () => {
    await sequelize.close();
  });

  describe('POST /roles', () => {
    it('should create a new role in the database and return 201', async () => {
      // Act: Make the API request
      const res = await request(app)
        .post('/roles')
        .send({ name: 'e2e_tester' });

      // Assert HTTP Response
      expect(res.statusCode).toEqual(201);
      expect(res.body.data.name).toBe('e2e_tester');

      // Assert Database State (The "End-to-End" part)
      const newRoleInDb = await Role.findOne({ where: { name: 'e2e_tester' } });
      expect(newRoleInDb).not.toBeNull();
      expect(newRoleInDb.id).toBe(res.body.data.id);
    });

    it('should fail to create a role if validation fails and return 400', async () => {
      const res = await request(app)
        .post('/roles')
        .send({ name: 123 }); // Invalid data

      expect(res.statusCode).toEqual(400);
      expect(res.body.message).toBe('Role name must be a string');

      // Assert that nothing was added to the database
      const count = await Role.count();
      expect(count).toEqual(0);
    });
  });

  describe('GET /roles', () => {
    it('should retrieve all roles from the database', async () => {
      // Arrange: Seed the database with some data for this specific test
      await Role.create({ name: 'role1' });
      await Role.create({ name: 'role2' });

      // Act
      const res = await request(app).get('/roles');

      // Assert
      expect(res.statusCode).toEqual(200);
      expect(res.body.data.length).toBe(2);
      expect(res.body.data.map(r => r.name)).toContain('role1');
      expect(res.body.data.map(r => r.name)).toContain('role2');
    });
  });

  describe('PUT /roles/:id', () => {
    it('should update a role in the database and return 200', async () => {
      // Arrange: Create a role to be updated
      const role = await Role.create({ name: 'to_be_updated' });

      // Act
      const res = await request(app)
        .put(`/roles/${role.id}`)
        .send({ name: 'now_updated' });

      // Assert HTTP Response
      expect(res.statusCode).toEqual(200);
      expect(res.body.data.name).toBe('now_updated');

      // Assert Database State
      const updatedRoleFromDb = await Role.findByPk(role.id);
      expect(updatedRoleFromDb.name).toBe('now_updated');
    });
  });

  describe('DELETE /roles/:id', () => {
    it('should delete a role from the database and return 204', async () => {
      // Arrange: Create a role to be deleted
      const role = await Role.create({ name: 'to_be_deleted' });

      // Act
      const res = await request(app).delete(`/roles/${role.id}`);

      // Assert HTTP Response
      expect(res.statusCode).toEqual(204);

      // Assert Database State
      const deletedRoleFromDb = await Role.findByPk(role.id);
      expect(deletedRoleFromDb).toBeNull();
    });
  });
});
