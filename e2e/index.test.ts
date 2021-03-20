import request from 'supertest';
import app from '../src/app';

describe('Base route', () => {
  it(`should return 200 HTTP success code when pointed to the base route`, async () => {
    const res = await request(app).get('/');

    expect(res.status).toBe(200);
  });
});

describe('Unknown Routes', () => {
  it(`should return 404 HTTP error code user points to unknown routes on the API`, async () => {
    const response = await request(app).put('/questions/');

    expect(response.status).toBe(404);
    expect(response.body.data).toBeNull();
  });
});
