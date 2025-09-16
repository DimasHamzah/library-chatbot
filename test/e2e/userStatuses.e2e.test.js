const request = require('supertest');
const app = require('../../app');
const { sequelize, UserStatus } = require('../../app/db/models');

// ---- E2E TEST SUITE FOR /user-statuses ----

describe('User Statuses API End-to-End Tests', () => {

  // Before all tests, connect to the database and recreate the schema
  beforeAll(async () => {
    await sequelize.sync({ force: true });
  });

  // After each test, truncate the table to ensure test isolation
  afterEach(async () => {
    await UserStatus.destroy({ truncate: true });
  });

  // After all tests are complete, close the database connection
  afterAll(async () => {
    await sequelize.close();
  });

  describe('POST /user-statuses', () => {
    it('should create a new user status in the database and return 201', async () => {
      // Act
      const res = await request(app)
        .post('/user-statuses')
        .send({ name: 'pending_approval' });

      // Assert HTTP Response
      expect(res.statusCode).toEqual(201);
      expect(res.body.data.name).toBe('pending_approval');

      // Assert Database State
      const newStatusInDb = await UserStatus.findOne({ where: { name: 'pending_approval' } });
      expect(newStatusInDb).not.toBeNull();
      expect(newStatusInDb.id).toBe(res.body.data.id);
    });

    it('should fail to create a status if validation fails and return 400', async () => {
      const res = await request(app)
        .post('/user-statuses')
        .send({ name: '' }); // Invalid empty name

      expect(res.statusCode).toEqual(400);
      expect(res.body.message).toBe('User status name is required');

      // Assert that nothing was added to the database
      const count = await UserStatus.count();
      expect(count).toEqual(0);
    });
  });

  describe('GET /user-statuses', () => {
    it('should retrieve all user statuses from the database', async () => {
      // Arrange: Seed the database
      await UserStatus.create({ name: 'status_a' });
      await UserStatus.create({ name: 'status_b' });

      // Act
      const res = await request(app).get('/user-statuses');

      // Assert
      expect(res.statusCode).toEqual(200);
      expect(res.body.data.length).toBe(2);
      expect(res.body.data.map(s => s.name)).toContain('status_a');
    });
  });

  describe('PUT /user-statuses/:id', () => {
    it('should update a user status in the database and return 200', async () => {
      // Arrange
      const status = await UserStatus.create({ name: 'to_update' });

      // Act
      const res = await request(app)
        .put(`/user-statuses/${status.id}`)
        .send({ name: 'was_updated' });

      // Assert HTTP Response
      expect(res.statusCode).toEqual(200);
      expect(res.body.data.name).toBe('was_updated');

      // Assert Database State
      const updatedStatusFromDb = await UserStatus.findByPk(status.id);
      expect(updatedStatusFromDb.name).toBe('was_updated');
    });
  });

  describe('DELETE /user-statuses/:id', () => {
    it('should delete a user status from the database and return 204', async () => {
      // Arrange
      const status = await UserStatus.create({ name: 'to_delete' });

      // Act
      const res = await request(app).delete(`/user-statuses/${status.id}`);

      // Assert HTTP Response
      expect(res.statusCode).toEqual(204);

      // Assert Database State
      const deletedStatusFromDb = await UserStatus.findByPk(status.id);
      expect(deletedStatusFromDb).toBeNull();
    });
  });
});
