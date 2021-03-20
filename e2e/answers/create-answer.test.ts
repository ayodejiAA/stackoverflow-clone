import request from 'supertest';
import app from '../../src/app';

import { BASE_URL } from '../../src/config/environments';
import { createAnswerDetails, signinDetails } from '../__mock__';

let token: string;

describe('Answers Routes', () => {
  beforeAll(async (done) => {
    request(app)
      .post(`${BASE_URL}/auth/login`)
      .send(signinDetails)
      .end((_err, response) => {
        token = response.headers['authorization'];
        done();
      });
  });

  describe('when user engage to answer questions', () => {
    it(`should successfully create answer when user inputs required details`, async (done) => {
      const response = await request(app)
        .post(`${BASE_URL}/questions/1/answers`)
        .set('Authorization', token)
        .send(createAnswerDetails);

      expect(response.status).toBe(201);
      expect(response.body.status).toMatch('success');
      expect(response.body.data.text).toMatch(createAnswerDetails.text);
      done();
    });

    it(`should return unauthorized error if user provides invalid token  `, async (done) => {
      const response = await request(app)
        .post(`${BASE_URL}/questions/1/answers`)
        .set('Authorization', 'token')
        .send(createAnswerDetails);

      expect(response.status).toBe(401);
      expect(response.body.status).toMatch('error');
      expect(response.body.message).toMatch('Invalid Token');
      done();
    });

    it('should return error response if token is not provided', async (done) => {
      const response = await request(app)
        .post(`${BASE_URL}/questions/2/answers`)
        .send(createAnswerDetails);

      expect(response.status).toBe(401);
      expect(response.body.status).toMatch('error');
      expect(response.body.message).toMatch('Access Denied. No Token Provided');
      expect(response.body.data).toBeNull();
      done();
    });
  });
});
