const request = require('supertest');

// NOTE: We will require app and other modules inside beforeEach to ensure absolute isolation

describe('User Status API', () => {
  let app;
  let UserStatus;
  let userStatusService;

  beforeEach(() => {
    // 1. Reset Jest's module cache. This is the most important step.
    jest.resetModules();

    // 2. Mock all necessary dependencies BEFORE requiring any app code.
    jest.mock('../app/db/models', () => ({
      Role: { findOne: jest.fn() },
      UserStatus: { findOne: jest.fn() },
    }));
    jest.mock('../app/services/UserStatusService');

    // 3. Require the app and its dependencies AFTER the mocks are defined.
    app = require('../app');
    UserStatus = require('../app/db/models').UserStatus;
    userStatusService = require('../app/services/UserStatusService');
  });

  describe('POST /user-statuses', () => {
    it('should create a new user status and return 201', async () => {
      // Arrange
      UserStatus.findOne.mockResolvedValue(null);
      userStatusService.create.mockResolvedValue({ id: 1, name: 'testing' });

      // Act
      const res = await request(app).post('/user-statuses').send({ name: 'testing' });

      // Assert
      expect(res.statusCode).toEqual(201);
      expect(res.body.data.name).toBe('testing');
    });

    it('should return 400 if name is already in use', async () => {
      // Arrange
      UserStatus.findOne.mockResolvedValue({ id: 2, name: 'existing' });

      // Act
      const res = await request(app).post('/user-statuses').send({ name: 'existing' });

      // Assert
      expect(res.statusCode).toEqual(400);
      expect(res.body.message).toBe('User status name already in use');
    });
  });

  // --- The rest of your tests for GET, PUT, DELETE ---
  describe('GET /user-statuses', () => {
    it('should return all user statuses and 200', async () => {
      userStatusService.findAll.mockResolvedValue([{ id: 1, name: 'active' }]);
      const res = await request(app).get('/user-statuses');
      expect(res.statusCode).toEqual(200);
    });
  });

  describe('GET /user-statuses/:id', () => {
    it('should return a single user status and 200', async () => {
      userStatusService.findById.mockResolvedValue({ id: 1, name: 'active' });
      const res = await request(app).get('/user-statuses/1');
      expect(res.statusCode).toEqual(200);
    });

    it('should return 404 if user status not found', async () => {
      userStatusService.findById.mockResolvedValue(null);
      const res = await request(app).get('/user-statuses/99');
      expect(res.statusCode).toEqual(404);
    });
  });

  describe('PUT /user-statuses/:id', () => {
    it('should update a user status and return 200', async () => {
      UserStatus.findOne.mockResolvedValue(null);
      userStatusService.update.mockResolvedValue({ id: 1, name: 'updated' });
      const res = await request(app).put('/user-statuses/1').send({ name: 'updated' });
      expect(res.statusCode).toEqual(200);
    });

    it('should return 404 if user status to update not found', async () => {
      UserStatus.findOne.mockResolvedValue(null);
      userStatusService.update.mockResolvedValue(null);
      const res = await request(app).put('/user-statuses/99').send({ name: 'non_existent' });
      expect(res.statusCode).toEqual(404);
    });
  });

  describe('DELETE /user-statuses/:id', () => {
    it('should delete a user status and return 204', async () => {
      userStatusService.delete.mockResolvedValue(true);
      const res = await request(app).delete('/user-statuses/1');
      expect(res.statusCode).toEqual(204);
    });

    it('should return 404 if user status to delete not found', async () => {
      userStatusService.delete.mockResolvedValue(false);
      const res = await request(app).delete('/user-statuses/99');
      expect(res.statusCode).toEqual(404);
    });
  });
});
