const request = require('supertest');
const app = require('../app');
const { sequelize } = require('../src/infrastructure/database/models');

beforeAll(async () => {
  await sequelize.sync({ force: true });
});

afterAll(async () => {
  await sequelize.close();
});

describe('Roles API', () => {
  it('should create a new role', async () => {
    const res = await request(app)
      .post('/roles')
      .send({
        name: 'admin',
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body.data.name).toBe('admin');
  });

  it('should get all roles', async () => {
    const res = await request(app).get('/roles');
    expect(res.statusCode).toEqual(200);
    expect(res.body.data.length).toBe(1);
  });

  it('should get a role by id', async () => {
    const res = await request(app).get('/roles/1');
    expect(res.statusCode).toEqual(200);
    expect(res.body.data.name).toBe('admin');
  });

  it('should update a role', async () => {
    const res = await request(app)
      .put('/roles/1')
      .send({
        name: 'superadmin',
      });
    expect(res.statusCode).toEqual(200);
    expect(res.body.data.name).toBe('superadmin');
  });

  it('should delete a role', async () => {
    const res = await request(app).delete('/roles/1');
    expect(res.statusCode).toEqual(200);
  });
});
