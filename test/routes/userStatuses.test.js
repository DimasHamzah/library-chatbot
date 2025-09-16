const request = require('supertest');

// 1. Declare a variable to hold our mock service instance.
let mockUserStatusService;

// 2. Mock the entire service module.
// This factory function is hoisted and executed by Jest before any other code.
// We create the mock object here and assign it to the outer variable.
jest.mock('../../app/services/UserStatusService', () => {
  mockUserStatusService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findById: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };
  // The mock constructor will always return this single mock object.
  return jest.fn().mockImplementation(() => mockUserStatusService);
});

// 3. Now that the mock is configured, require the app.
// The DI container inside the app will now use our mockUserStatusService.
const app = require('../../app');

describe('User Statuses API Integration Tests', () => {
  beforeEach(() => {
    // Clear the history of our mock's methods before each test.
    jest.clearAllMocks();
  });

  describe('POST /user-statuses', () => {
    it('should create a new user status and return 201', async () => {
      mockUserStatusService.create.mockResolvedValue({ id: 1, name: 'pending' });

      const res = await request(app).post('/user-statuses').send({ name: 'pending' });

      expect(res.statusCode).toEqual(201);
      expect(mockUserStatusService.create).toHaveBeenCalledWith({ name: 'pending' });
    });

    it('should return 400 on validation failure', async () => {
      const res = await request(app).post('/user-statuses').send({ name: '' });
      expect(res.statusCode).toEqual(400);
      expect(mockUserStatusService.create).not.toHaveBeenCalled();
    });
  });

  describe('GET /user-statuses', () => {
    it('should fetch all user statuses and return 200', async () => {
      mockUserStatusService.findAll.mockResolvedValue([{ id: 1, name: 'active' }]);
      const res = await request(app).get('/user-statuses');
      expect(res.statusCode).toEqual(200);
    });
  });

  describe('GET /user-statuses/:id', () => {
    it('should return a status by ID', async () => {
      mockUserStatusService.findById.mockResolvedValue({ id: 1, name: 'active' });
      const res = await request(app).get('/user-statuses/1');
      expect(res.statusCode).toEqual(200);
    });

    it('should return 404 if not found', async () => {
      mockUserStatusService.findById.mockResolvedValue(null);
      const res = await request(app).get('/user-statuses/99');
      expect(res.statusCode).toEqual(404);
    });
  });

  describe('PUT /user-statuses/:id', () => {
    it('should update a status', async () => {
      mockUserStatusService.update.mockResolvedValue({ id: 1, name: 'updated' });
      const res = await request(app).put('/user-statuses/1').send({ name: 'updated' });
      expect(res.statusCode).toEqual(200);
    });
  });

  describe('DELETE /user-statuses/:id', () => {
    it('should delete a status', async () => {
      mockUserStatusService.delete.mockResolvedValue(true);
      const res = await request(app).delete('/user-statuses/1');
      expect(res.statusCode).toEqual(204);
    });
  });
});
