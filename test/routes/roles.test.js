const request = require('supertest');

// 1. Create a single, explicit mock object for the service.
const mockRoleService = {
  create: jest.fn(),
  findAll: jest.fn(),
  findById: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
};

// 2. Mock the entire service module.
// When the RoleService class is constructed (`new RoleService()`), return our explicit mock object.
// This ensures the DI container in the app gets our mock.
jest.mock('../../app/services/RoleService', () => {
  return jest.fn().mockImplementation(() => {
    return mockRoleService;
  });
});

// 3. Now that the mock is configured, require the app.
const app = require('../../app');

describe('Roles API Integration Tests', () => {
  beforeEach(() => {
    // Clear the history of our mock's methods before each test.
    jest.clearAllMocks();
  });

  describe('POST /roles', () => {
    it('should create a new role and return 201', async () => {
      mockRoleService.create.mockResolvedValue({ id: 1, name: 'new_admin' });

      const res = await request(app).post('/roles').send({ name: 'new_admin' });

      expect(res.statusCode).toEqual(201);
      expect(mockRoleService.create).toHaveBeenCalledWith({ name: 'new_admin' });
    });

    it('should return 400 on validation failure', async () => {
      const res = await request(app).post('/roles').send({ name: '' });
      expect(res.statusCode).toEqual(400);
      expect(mockRoleService.create).not.toHaveBeenCalled();
    });
  });

  describe('GET /roles', () => {
    it('should fetch all roles and return 200', async () => {
      mockRoleService.findAll.mockResolvedValue([{ id: 1, name: 'admin' }]);
      const res = await request(app).get('/roles');
      expect(res.statusCode).toEqual(200);
    });
  });

  describe('GET /roles/:id', () => {
    it('should return a role by ID', async () => {
      mockRoleService.findById.mockResolvedValue({ id: 1, name: 'admin' });
      const res = await request(app).get('/roles/1');
      expect(res.statusCode).toEqual(200);
    });

    it('should return 404 if not found', async () => {
      mockRoleService.findById.mockResolvedValue(null);
      const res = await request(app).get('/roles/99');
      expect(res.statusCode).toEqual(404);
    });
  });

  describe('PUT /roles/:id', () => {
    it('should update a role', async () => {
      mockRoleService.update.mockResolvedValue({ id: 1, name: 'updated' });
      const res = await request(app).put('/roles/1').send({ name: 'updated' });
      expect(res.statusCode).toEqual(200);
    });
  });

  describe('DELETE /roles/:id', () => {
    it('should delete a role', async () => {
      mockRoleService.delete.mockResolvedValue(true);
      const res = await request(app).delete('/roles/1');
      expect(res.statusCode).toEqual(204);
    });
  });
});
