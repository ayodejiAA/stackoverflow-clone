import request from 'supertest';
import app from '../../src/app';

import { BASE_URL } from '../../src/config/environments';
import { User } from '../../src/users/user.model';
import { signupDetails } from '../__mock__';

describe('Signup Route', () => {
  afterAll(async () => {
    const user = await User.findOne({ where: { email: signupDetails.email } });
    user.destroy();
  });

  describe('User signup test', () => {
    it('should sign up a new user', async (done) => {
      const response = await request(app)
        .post(`${BASE_URL}/auth/signup`)
        .send(signupDetails);

      expect(response.status).toBe(201);
      expect(typeof response.body).toBe('object');
      expect(response.body.status).toBe('success');
      expect(response.body.message).toBe('User account successfully created');
      expect(response.body.data.displayName).toBe(signupDetails.displayName);
      expect(response.body.data.email).toBe(signupDetails.email);
      expect(response.body.data.password).toBeFalsy();
      expect(typeof response.header.authorization).toBe('string');
      done();
    });

    it('should return a conflict error response if user try signing up with same email', async (done) => {
      const response = await request(app)
        .post(`${BASE_URL}/auth/signup`)
        .send(signupDetails);
      expect(response.status).toBe(409);
      expect(response.body.status).toBe('error');
      expect(response.body.message).toMatch(
        'Email address has already been taken',
      );
      expect(response.body.data).toBeNull();
      done();
    });

    it('should return validation error for not too good password', async (done) => {
      const response = await request(app)
        .post(`${BASE_URL}/auth/signup`)
        .send({ ...signupDetails, password: 'password' });
      expect(response.status).toBe(422);
      expect(response.body.status).toMatch('error');
      expect(response.body.data.fields).toHaveProperty('password');
      done();
    });

    it('should return validation error if a field is empty', async (done) => {
      const response = await request(app)
        .post(`${BASE_URL}/auth/signup`)
        .send({ ...signupDetails, email: '' });
      expect(response.status).toBe(422);
      expect(response.body.status).toMatch('error');
      expect(response.body.data.fields).toHaveProperty('email');
      done();
    });
  });
});
