const request = require('supertest')
const app = require('./index')

describe('Test the Games path', () => {
  test('Should respond 200 to GET request', () => {
    return request(app)
      .get('/games')
      .expect(200);
  });
});