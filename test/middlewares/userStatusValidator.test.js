const request = require('supertest');
const express = require('express');
const { validationResult } = require('express-validator');
const { userStatusValidationRules } = require('../../app/middlewares/userStatusValidator');

const app = express();
app.use(express.json());

// The definitive fix: Use the spread operator (...) to unpack the array of rules.
app.post('/test', ...userStatusValidationRules, (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ message: errors.array()[0].msg });
  }
  res.status(200).json({ message: 'Validation passed' });
});

describe('User Status Validator Middleware', () => {

  it('should pass validation when name is a valid string', async () => {
    const res = await request(app).post('/test').send({ name: 'a_valid_status' });
    expect(res.statusCode).toEqual(200);
  });

  it('should fail validation if name is empty', async () => {
    const res = await request(app).post('/test').send({ name: '' });
    expect(res.statusCode).toEqual(400);
    expect(res.body.message).toBe('User status name is required');
  });

  it('should fail validation if name is not a string', async () => {
    const res = await request(app).post('/test').send({ name: 98765 });
    expect(res.statusCode).toEqual(400);
    expect(res.body.message).toBe('User status name must be a string');
  });
});
