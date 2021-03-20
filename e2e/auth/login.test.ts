import request from 'supertest';
import app from '../../src/app';

import { BASE_URL } from '../../src/config/environments';
import { signinDetails } from '../__mock__';

describe('Login Route', () => {
  describe('User login test', () => {
    it('should sign in as existing user', async (done) => {
      const response = await request(app)
        .post(`${BASE_URL}/auth/login`)
        .send(signinDetails);

      expect(response.status).toBe(200);
      expect(response.body.data.displayName).toMatch('Alina');
      expect(response.header).toHaveProperty('authorization');
      expect(typeof response.header.authorization).toBe('string');
      expect(response.body.data.password).toBeFalsy();
      expect(response.body.data.email).toMatch(signinDetails.email);
      done();
    });

    it('should return an authorised error for incorrect email address', async (done) => {
      const response = await request(app)
        .post(`${BASE_URL}/auth/login`)
        .send({ ...signinDetails, email: 'testing123@email.com' });

      expect(response.status).toBe(401);
      expect(response.body.status).toMatch('error');
      expect(response.body.message).toMatch('Email or password incorrect');
      expect(response.body.data).toBeNull();
      done();
    });

    it('should return validation error when email field is empty', async (done) => {
      const response = await request(app)
        .post(`${BASE_URL}/auth/signup`)
        .send({ ...signinDetails, email: '' });

      expect(response.status).toBe(422);
      expect(response.body.status).toMatch('error');
      done();
    });
  });
});
