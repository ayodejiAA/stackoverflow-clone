import request from 'supertest';
import app from '../../src/app';

import { BASE_URL } from '../../src/config/environments';
import { createQuestionDetails, signinDetails } from '../__mock__';

let token: string;

describe('Questions Routes', () => {
  beforeAll(async (done) => {
    request(app)
      .post(`${BASE_URL}/auth/login`)
      .send(signinDetails)
      .end((_err, response) => {
        token = response.headers['authorization'];
        done();
      });
  });

  describe('when user engage to ask a question', () => {
    it(`should create question when user inputs required details`, async (done) => {
      const response = await request(app)
        .post(`${BASE_URL}/questions`)
        .set('Authorization', token)
        .send(createQuestionDetails);

      expect(response.status).toBe(201);
      expect(response.body.status).toMatch('success');
      expect(response.body.data.title).toMatch(createQuestionDetails.title);
      done();
    });

    it(`should return unauthorized error if user provides invalid token  `, async (done) => {
      const response = await request(app)
        .post(`${BASE_URL}/questions`)
        .set('Authorization', 'token')
        .send(createQuestionDetails);

      expect(response.status).toBe(401);
      expect(response.body.status).toMatch('error');
      expect(response.body.message).toMatch('Invalid Token');
      done();
    });

    it('should return error response if token is not provided', async (done) => {
      const response = await request(app)
        .post(`${BASE_URL}/questions/`)
        .send(createQuestionDetails);

      expect(response.status).toBe(401);
      expect(response.body.status).toMatch('error');
      expect(response.body.message).toMatch('Access Denied. No Token Provided');
      expect(response.body.data).toBeNull();
      done();
    });
  });
});
