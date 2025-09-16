const request = require('supertest');
const app = require('../../app');
const roleService = require('../../app/services/RoleService');

// Mock the service layer to isolate the controller and test the full request-response cycle
jest.mock('../../app/services/RoleService');

describe('Roles API Integration Tests', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('POST /roles', () => {
    it('should create a new role and return 201 when data is valid', async () => {
      // Arrange
      const newRoleData = { name: 'new_admin' };
      const createdRole = { id: 3, ...newRoleData };
      roleService.create.mockResolvedValue(createdRole);

      // Act
      const res = await request(app)
        .post('/roles')
        .send(newRoleData);

      // Assert
      expect(res.statusCode).toEqual(201);
      expect(res.body.status).toBe('success');
      expect(res.body.data.name).toBe('new_admin');
      expect(roleService.create).toHaveBeenCalledWith(newRoleData);
    });

    it('should return 400 when validation fails (e.g., name is empty)', async () => {
      // Act
      const res = await request(app)
        .post('/roles')
        .send({ name: '' });

      // Assert
      expect(res.statusCode).toEqual(400);
      expect(res.body.status).toBe('error');
      expect(res.body.message).toBe('Role name is required');
      expect(roleService.create).not.toHaveBeenCalled();
    });

    it('should return 500 when the service layer throws an error', async () => {
      // Arrange
      const newRoleData = { name: 'new_admin' };
      roleService.create.mockRejectedValue(new Error('Internal Server Error'));

      // Act
      const res = await request(app)
        .post('/roles')
        .send(newRoleData);

      // Assert
      expect(res.statusCode).toEqual(500);
      expect(res.body.status).toBe('error');
      expect(res.body.message).toBe('Internal Server Error');
    });
  });

  describe('GET /roles', () => {
    it('should fetch all roles and return 200', async () => {
      // Arrange
      const roles = [{ id: 1, name: 'admin' }, { id: 2, name: 'member' }];
      roleService.findAll.mockResolvedValue(roles);

      // Act
      const res = await request(app).get('/roles');

      // Assert
      expect(res.statusCode).toEqual(200);
      expect(res.body.status).toBe('success');
      expect(res.body.data.length).toBe(2);
    });
  });

  describe('GET /roles/:id', () => {
    it('should fetch a single role by id and return 200', async () => {
      // Arrange
      const role = { id: 1, name: 'admin' };
      roleService.findById.mockResolvedValue(role);

      // Act
      const res = await request(app).get('/roles/1');

      // Assert
      expect(res.statusCode).toEqual(200);
      expect(res.body.data.name).toBe('admin');
    });

    it('should return 404 when the role is not found', async () => {
      // Arrange
      roleService.findById.mockResolvedValue(null);

      // Act
      const res = await request(app).get('/roles/99');

      // Assert
      expect(res.statusCode).toEqual(404);
      expect(res.body.status).toBe('error');
      expect(res.body.message).toBe('Role not found');
    });
  });

  describe('PUT /roles/:id', () => {
    it('should update a role and return 200', async () => {
      // Arrange
      const updatedData = { name: 'super_admin' };
      const updatedRole = { id: 1, ...updatedData };
      roleService.update.mockResolvedValue(updatedRole);

      // Act
      const res = await request(app)
        .put('/roles/1')
        .send(updatedData);

      // Assert
      expect(res.statusCode).toEqual(200);
      expect(res.body.data.name).toBe('super_admin');
    });

    it('should return 404 when the role to update is not found', async () => {
      // Arrange
      roleService.update.mockResolvedValue(null);

      // Act
      const res = await request(app)
        .put('/roles/99')
        .send({ name: 'non_existent' });

      // Assert
      expect(res.statusCode).toEqual(404);
    });
  });

  describe('DELETE /roles/:id', () => {
    it('should delete a role and return 204', async () => {
      // Arrange
      roleService.delete.mockResolvedValue(true);

      // Act
      const res = await request(app).delete('/roles/1');

      // Assert
      expect(res.statusCode).toEqual(204);
    });

    it('should return 404 when the role to delete is not found', async () => {
      // Arrange
      roleService.delete.mockResolvedValue(false);

      // Act
      const res = await request(app).delete('/roles/99');

      // Assert
      expect(res.statusCode).toEqual(404);
    });
  });
});
