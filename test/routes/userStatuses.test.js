const request = require('supertest');
const app = require('../../app');
const userStatusService = require('../../app/services/UserStatusService');

// Mock the service layer to isolate the controller and test the full request-response cycle
jest.mock('../../app/services/UserStatusService');

describe('User Statuses API Integration Tests', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('POST /user-statuses', () => {
    it('should create a new user status and return 201 when data is valid', async () => {
      // Arrange
      const newStatusData = { name: 'pending' };
      const createdStatus = { id: 4, ...newStatusData };
      userStatusService.create.mockResolvedValue(createdStatus);

      // Act
      const res = await request(app)
        .post('/user-statuses')
        .send(newStatusData);

      // Assert
      expect(res.statusCode).toEqual(201);
      expect(res.body.status).toBe('success');
      expect(res.body.data.name).toBe('pending');
      expect(userStatusService.create).toHaveBeenCalledWith(newStatusData);
    });

    it('should return 400 when validation fails (e.g., name is not a string)', async () => {
      // Act
      const res = await request(app)
        .post('/user-statuses')
        .send({ name: 123 });

      // Assert
      expect(res.statusCode).toEqual(400);
      expect(res.body.status).toBe('error');
      expect(res.body.message).toBe('User status name must be a string');
      expect(userStatusService.create).not.toHaveBeenCalled();
    });

    it('should return 500 when the service layer throws an error', async () => {
      // Arrange
      const newStatusData = { name: 'pending' };
      userStatusService.create.mockRejectedValue(new Error('Internal Server Error'));

      // Act
      const res = await request(app)
        .post('/user-statuses')
        .send(newStatusData);

      // Assert
      expect(res.statusCode).toEqual(500);
      expect(res.body.status).toBe('error');
      expect(res.body.message).toBe('Internal Server Error');
    });
  });

  describe('GET /user-statuses', () => {
    it('should fetch all user statuses and return 200', async () => {
      // Arrange
      const statuses = [{ id: 1, name: 'active' }, { id: 2, name: 'inactive' }];
      userStatusService.findAll.mockResolvedValue(statuses);

      // Act
      const res = await request(app).get('/user-statuses');

      // Assert
      expect(res.statusCode).toEqual(200);
      expect(res.body.status).toBe('success');
      expect(res.body.data.length).toBe(2);
    });
  });

  describe('GET /user-statuses/:id', () => {
    it('should fetch a single user status by id and return 200', async () => {
      // Arrange
      const status = { id: 1, name: 'active' };
      userStatusService.findById.mockResolvedValue(status);

      // Act
      const res = await request(app).get('/user-statuses/1');

      // Assert
      expect(res.statusCode).toEqual(200);
      expect(res.body.data.name).toBe('active');
    });

    it('should return 404 when the user status is not found', async () => {
      // Arrange
      userStatusService.findById.mockResolvedValue(null);

      // Act
      const res = await request(app).get('/user-statuses/99');

      // Assert
      expect(res.statusCode).toEqual(404);
      expect(res.body.status).toBe('error');
      expect(res.body.message).toBe('User status not found');
    });
  });

  describe('PUT /user-statuses/:id', () => {
    it('should update a user status and return 200', async () => {
      // Arrange
      const updatedData = { name: 'archived' };
      const updatedStatus = { id: 1, ...updatedData };
      userStatusService.update.mockResolvedValue(updatedStatus);

      // Act
      const res = await request(app)
        .put('/user-statuses/1')
        .send(updatedData);

      // Assert
      expect(res.statusCode).toEqual(200);
      expect(res.body.data.name).toBe('archived');
    });

    it('should return 404 when the user status to update is not found', async () => {
      // Arrange
      userStatusService.update.mockResolvedValue(null);

      // Act
      const res = await request(app)
        .put('/user-statuses/99')
        .send({ name: 'non_existent' });

      // Assert
      expect(res.statusCode).toEqual(404);
    });
  });

  describe('DELETE /user-statuses/:id', () => {
    it('should delete a user status and return 204', async () => {
      // Arrange
      userStatusService.delete.mockResolvedValue(true);

      // Act
      const res = await request(app).delete('/user-statuses/1');

      // Assert
      expect(res.statusCode).toEqual(204);
    });

    it('should return 404 when the user status to delete is not found', async () => {
      // Arrange
      userStatusService.delete.mockResolvedValue(false);

      // Act
      const res = await request(app).delete('/user-statuses/99');

      // Assert
      expect(res.statusCode).toEqual(404);
    });
  });
});
