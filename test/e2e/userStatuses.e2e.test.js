const request = require('supertest');
const app = require('../../app');
const { sequelize, UserStatus } = require('../../app/db/models');

// ---- E2E TEST SUITE FOR /user-statuses ----

describe('User Statuses API End-to-End Tests', () => {

  // Before all tests, connect to the database.
  // We will no longer use force: true to prevent race conditions.
  // It is assumed the test database is migrated before running tests.
  beforeAll(async () => {
    await sequelize.sync();
  });

  // After each test, truncate the table to ensure test isolation.
  afterEach(async () => {
    await UserStatus.destroy({ truncate: true, cascade: true });
  });

  // After all tests are complete, close the database connection.
  afterAll(async () => {
    await sequelize.close();
  });

  describe('POST /user-statuses', () => {
    it('should create a new user status in the database and return 201', async () => {
      const res = await request(app)
        .post('/user-statuses')
        .send({ name: 'pending_approval' });

      expect(res.statusCode).toEqual(201);
      expect(res.body.data.name).toBe('pending_approval');

      const newStatusInDb = await UserStatus.findOne({ where: { name: 'pending_approval' } });
      expect(newStatusInDb).not.toBeNull();
    });

    it('should fail to create a status if validation fails', async () => {
      const res = await request(app)
        .post('/user-statuses')
        .send({ name: '' }); // Invalid empty name

      expect(res.statusCode).toEqual(400);
      const count = await UserStatus.count();
      expect(count).toEqual(0);
    });
  });

  describe('GET /user-statuses', () => {
    it('should retrieve all user statuses from the database', async () => {
      await UserStatus.create({ name: 'status_a' });
      await UserStatus.create({ name: 'status_b' });

      const res = await request(app).get('/user-statuses');

      expect(res.statusCode).toEqual(200);
      expect(res.body.data.length).toBe(2);
    });
  });

  describe('PUT /user-statuses/:id', () => {
    it('should update a user status in the database and return 200', async () => {
      const status = await UserStatus.create({ name: 'to_update' });

      const res = await request(app)
        .put(`/user-statuses/${status.id}`)
        .send({ name: 'was_updated' });

      expect(res.statusCode).toEqual(200);
      const updatedStatusFromDb = await UserStatus.findByPk(status.id);
      expect(updatedStatusFromDb.name).toBe('was_updated');
    });
  });

  describe('DELETE /user-statuses/:id', () => {
    it('should delete a user status from the database and return 204', async () => {
      const status = await UserStatus.create({ name: 'to_delete' });

      const res = await request(app).delete(`/user-statuses/${status.id}`);

      expect(res.statusCode).toEqual(204);
      const deletedStatusFromDb = await UserStatus.findByPk(status.id);
      expect(deletedStatusFromDb).toBeNull();
    });
  });
});
