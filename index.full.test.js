const request = require('supertest')
const { app, server} = require('./index')
const { listGames, addGame, delGame } = require("./database")
const { existsHelper, validateNum, findPropertyIndex } = require('./service')

jest.mock('./database', () => ({
  listGames: jest.fn(),
  addGame: jest.fn(),
  delGame: jest.fn()
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

describe('Test full POST operation for /games path', () => {
  it('Should respond 201 to POST request with new game', () => {
    const newGame = {
      gameId: 2,
      title: 'Another Game'
    }
    
    return request(app)
      .post('/games')
      .send(newGame)
      .expect(201)
      .expect('Creation successful')
      .then(() => {
        testGameList.push(newGame)
        expect(testGameList[1]).toMatchObject(newGame)
    })
  })
})

describe('Test full DELETE operation for /games/gameId path', () => {
  it('Should respond 204 to DELETE request', () => {

    return request(app)
      .delete('/games/gameId=1')
      .send(testGameList[0])
      .expect(204)
      .then(() => {
        testGameList.splice(0, 2)
        expect(testGameList).toMatchObject([])
      })
  })
})
