const request = require('supertest')
const express = require('express')
const app = express()

describe('Test the Games path', () => {
  test('Should respond 200 to GET request', () => {
    return request(app)
      .get('/games')
      .expect(200);
  });
});