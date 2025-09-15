const request = require('supertest')
const app = require('./index')
const { listGames } = require("./database")

jest.mock('./database', () => ({
  listGames: jest.fn()
}))

const testGameList = [
  {
    gameId: 1,
    title: 'Some Game',
    publisher: {
      publisherId: 1,
      name: 'Some Publisher'
    }
  }
]
listGames.mockReturnValue(testGameList)

describe('Test the Games path', () => {
  test('Should respond 200 to GET request', () => {
    return request(app)
      .get('/games')
      .expect(200)
      .expect(testGameList)
  });
});