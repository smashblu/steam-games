const request = require('supertest')
const { app, server} = require('./index')
const { findById, existsHelper, listGames, addGame, delGame } = require("./database")
const { validateNum } = require('./service')

jest.mock('./database', () => ({
  existsHelper: jest.fn(),
  listGames: jest.fn(() => {
    return testGameList
  }),
  addGame: jest.fn((obj) => {
    testGameList.push(obj)
  }),
  delGame: jest.fn((index) => {
    testGameList.splice(index, 1)
  })
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
const newGame = {
  gameId: 2,
  title: 'Another Game'
}

describe('Test full POST operation for /games path', () => {
  it('Should respond 201 to POST request with new game', () => {
    
    existsHelper.mockReturnValue(false)

    return request(app)
      .post('/games')
      .send(newGame)
      .expect(201)
      .expect(newGame)
      .then(() => {
        expect(testGameList[1]).toMatchObject(newGame)
    })
  })
})

describe('Test full DELETE operation for /games/gameId path', () => {
  it('Should respond 204 to DELETE request', () => {
    
    existsHelper.mockReturnValue(true)
    expect(listGames()).toBe(testGameList)
    delGame(0)
    
    return request(app)
      .delete('/games/gameId=1')
      .expect(204)
      .then(() => {
        expect(testGameList[0]).toMatchObject(newGame)
        expect(testGameList.length).toEqual(1)
      })
  })
})
