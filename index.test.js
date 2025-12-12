const request = require('supertest')
const { app, server} = require('./index')
const { findGames, existsHelper, listGames, addGame, delGame } = require("./database")
const { validateNum, findProperty, findPropertyIndex, makeList, matchProp, updateProps } = require('./service')

jest.mock('./database', () => ({
  findGames: jest.fn(),
  existsHelper: jest.fn(),
  listGames: jest.fn(),
  addGame: jest.fn(),
  delGame: jest.fn()
}))

jest.mock('./service', () => ({
  validateNum: jest.fn(),
  findProperty: jest.fn(),
  findPropertyIndex: jest.fn(),
  makeList: jest.fn(),
  matchProp: jest.fn(),
  updateProps: jest.fn(),
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
  it('Should respond 200 to a successful GET request', () => {
    return request(app)
      .get('/games')
      .expect(200)
      .expect(testGameList)
  })
})

describe('Test POST operation for /games path', () => {
  it('Should respond 201 to a successful POST request with new game', () => {
    const newGame = {
      gameId: 2,
      title: 'Another Game'
    }

    existsHelper.mockReturnValue(false)

    return request(app)
      .post('/games')
      .send(newGame)
      .expect(201)
      .expect(newGame)
      .then(() => {
        expect(addGame).toHaveBeenCalledWith(newGame)
      })
  })
  it('Should respond 409 to POST request stating game already exists', () => {

    existsHelper.mockReturnValue(true)

    return request(app)
      .post('/games')
      .send(testGameList[0])
      .expect('Game with same title already exists, no action taken')
      .expect(409)
  })
})

describe('Test GET operation for /games/gameId path', () => {
  it('Should respond 200 to a successful GET request', () => {

    validateNum.mockReturnValue(true)
    findGames.mockReturnValue(testGameList[0])

    return request(app)
      .get('/games/gameId=1')
      .expect(200)
      .expect(testGameList[0])
  })
  it('Should respond 404 to GET request when the gameId does not exist', () => {

    validateNum.mockReturnValue(true)
    findGames.mockReturnValue([])
    
    return request(app)
      .get('/games/gameId=1')
      .expect(404)
      .expect('Game ID does not exist')
  })
})

describe('Test GET operation for /games/publisherId path', () => {
  it('Should respond 200 to GET request', () => {

    validateNum.mockReturnValue(true)
    findGames.mockReturnValue(testGameList)
    
    return request(app)
      .get('/games/publisherId=1')
      .expect(200)
      .expect(testGameList)
  })
  it('Should respond 404 to GET request when publisherId does not exist', () => {

    validateNum.mockReturnValue(true)
    findGames.mockReturnValue([])
    
    return request(app)
      .get('/games/publisherId=2')
      .expect(404)
      .expect('Publisher ID does not exist')
  })
})

describe('Test PATCH operation for /games/gameId path', () => {
  it('Should respond 201 to a successful PATCH request', () => {
    const newGame = {
      gameId: 1,
      title: 'Another Game'
    }

    validateNum.mockReturnValue(true)
    existsHelper.mockReturnValue(true)
    matchProp.mockReturnValue(false)
    findProperty.mockReturnValue(testGameList[0])

    return request(app)
      .patch('/games/gameId=1')
      .send(newGame)
      .expect(201)
      .expect('Update successful')
      .then(() => {
        expect(updateProps).toHaveBeenCalledWith(newGame, testGameList[0])
      })
  })
  it('Should respond 400 to PATCH request when trying to update gameId', () => {

    validateNum.mockReturnValue(true)
    existsHelper.mockReturnValue(true)
    matchProp.mockReturnValue(true)
    
    return request(app)
      .patch('/games/gameId=1')
      .expect(400)
      .expect('Game ID cannot be changed')
  })
})

describe('Test DELETE operation for /games/gameId path', () => {
  it('Should respond 204 to a successful DELETE request', () => {

    validateNum.mockReturnValue(true)
    existsHelper.mockReturnValue(true)

    return request(app)
      .delete('/games/gameId=1')
      .expect(204)
      .then(() => {
        expect(delGame).toHaveBeenCalledWith(1)
      })
  })
  it('Should respond 404 to DELETE request for a gameId that does not exist', () => {

    validateNum.mockReturnValue(true)
    existsHelper.mockReturnValue(false)
    
    return request(app)
      .delete('/games/gameId=1')
      .expect(404)
      .expect('Game ID does not exist')
  })
})
