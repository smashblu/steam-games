const request = require('supertest')
const { app, server} = require('./index')
const { listGames, addGame } = require("./database")
const { existsHelper } = require('./service')

jest.mock('./database', () => ({
  listGames: jest.fn(),
  addGame: jest.fn()
}))

jest.mock('./service', () => ({
  existsHelper: jest.fn(),
}))

afterAll(() => {
  server.close()
})

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

describe('Test GET operation for /games path', () => {
  test('Should respond 200 to GET request', () => {
    return request(app)
      .get('/games')
      .expect(200)
      .expect(testGameList)
  });
});

describe('Test POST operation for /games path', () => {
  test('Should respond 201 to POST request with new game', () => {
    const newGame = {
      gameId: 2,
      title: 'Another Game'
    }

    existsHelper.mockReturnValue(false)

    return request(app)
      .post('/games')
      .send(newGame)
      .expect(201)
      .expect('Creation successful')
      .then(() => {
        expect(addGame).toHaveBeenCalledWith(newGame)
      })
  });
});