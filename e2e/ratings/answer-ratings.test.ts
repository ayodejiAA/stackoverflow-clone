import request from 'supertest';
import app from '../../src/app';

import { BASE_URL } from '../../src/config/environments';
import { signinDetails } from '../__mock__';

let token: string;

describe('Answers Ratings Routes Test', () => {
  beforeAll(async (done) => {
    request(app)
      .post(`${BASE_URL}/auth/login`)
      .send(signinDetails)
      .end((_err, response) => {
        token = response.headers['authorization'];
        done();
      });
  });

  describe('when user rates an answer by upvoting', () => {
    it(`should reponnd with 201 if successful`, async (done) => {
      const response = await request(app)
        .post(`${BASE_URL}/questions/2/answers/2/upvote`)
        .set('Authorization', token);

      expect(response.status).toBe(201);
      expect(response.body.status).toMatch('success');
      expect(response.body.data).toHaveProperty('contentId');
      expect(response.body.data.contentType).toMatch('answer');
      done();
    });

    it(`should downvote answer if user upvotes same question after the initial upvote`, async (done) => {
      const response = await request(app)
        .post(`${BASE_URL}/questions/2/answers/2/upvote`)
        .set('Authorization', token);

      expect(response.status).toBe(200);
      expect(response.body.status).toMatch('success');
      expect(response.body.data.destroy).toEqual(1);
      done();
    });

    it('should return error response if token is not provided', async (done) => {
      const response = await request(app).post(
        `${BASE_URL}/questions/1/answers/1/upvote`,
      );

      expect(response.status).toBe(401);
      expect(response.body.status).toMatch('error');
      expect(response.body.message).toMatch('Access Denied. No Token Provided');
      expect(response.body.data).toBeNull();
      done();
    });

    it(`should respond with 409 error if user downvotes question they have not upvoted`, async (done) => {
      const response = await request(app)
        .post(`${BASE_URL}/questions/2/answers/2/downvote`)
        .set('Authorization', token);

      expect(response.status).toBe(409);
      expect(response.body.status).toMatch('error');
      done();
    });

    it(`should allow users to downvote answer they have already upvoted`, async (done) => {
      await request(app)
        .post(`${BASE_URL}/questions/2/answers/2/upvote`)
        .set('Authorization', token);

      const response = await request(app)
        .post(`${BASE_URL}/questions/2/answers/2/downvote`)
        .set('Authorization', token);

      expect(response.status).toBe(200);
      expect(response.body.status).toMatch('success');
      expect(response.body.data.destroy).toEqual(1);
      done();
    });

    it(`should respond with 404 error if answer does not exist`, async (done) => {
      const response = await request(app)
        .post(`${BASE_URL}/questions/2/answers/34444/downvote`)
        .set('Authorization', token);

      expect(response.status).toBe(404);
      expect(response.body.status).toMatch('error');
      done();
    });
  });
});
