const request = require('supertest')
const { app, server} = require('./index')
const { listGames, addGame } = require("./database")
const { existsHelper, validateNum, findProperty, makeList, matchProp } = require('./service')

jest.mock('./database', () => ({
  listGames: jest.fn(),
  addGame: jest.fn()
}))

jest.mock('./service', () => ({
  existsHelper: jest.fn(),
  validateNum: jest.fn(),
  findProperty: jest.fn(),
  makeList: jest.fn(),
  matchProp: jest.fn(),
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
  it('Should respond 200 to GET request', () => {
    return request(app)
      .get('/games')
      .expect(200)
      .expect(testGameList)
  })
})

describe('Test POST operation for /games path', () => {
  it('Should respond 201 to POST request with new game', () => {
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
  })
  it('Should respond 409 to POST request stating game already exists', () => {

    existsHelper.mockReturnValue(true)

    return request(app)
      .post('/games')
      .send(testGameList[0])
      .expect('Game ID already exists, no action taken')
      .expect(409)
  })
})

describe('Test GET operation for /games/gameId path', () => {
  it('Should respond 200 to GET request', () => {

    validateNum.mockReturnValue(true)
    existsHelper.mockReturnValue(true)
    findProperty.mockReturnValue(testGameList[0])

    return request(app)
      .get('/games/gameId=:gameId')
      .expect(200)
      .expect(testGameList[0])
  })
  it('Should respond 404 to GET request', () => {

    validateNum.mockReturnValue(true)
    existsHelper.mockReturnValue(false)
    
    return request(app)
      .get('/games/gameId=:gameId')
      .expect(404)
      .expect('Game ID does not exist')
  })
})

describe('Test GET operation for /games/publisherId path', () => {
  it('Should respond 200 to GET request', () => {

    validateNum.mockReturnValue(true)
    existsHelper.mockReturnValue(true)
    makeList.mockReturnValue(testGameList)
    
    return request(app)
      .get('/games/publisherId=:publisherId')
      .expect(200)
      .expect(testGameList)
  })
  it('Should respond 404 to GET request', () => {

    validateNum.mockReturnValue(true)
    existsHelper.mockReturnValue(false)
    
    return request(app)
      .get('/games/publisherId=:publisherId')
      .expect(404)
      .expect('Publisher ID does not exist')
  })
})

describe('Test PATCH operation for /games/gameId path', () => {
  /* it('Should respond 201 to GET request', () => {

    validateNum.mockReturnValue(true)
    existsHelper.mockReturnValue(true)
    matchProp.mockReturnValue(false)

    return request(app)
      .patch('/games/gameId=:gameId')
      .expect(201)
      .expect()
  }) */
  it('Should respond 400 to GET request', () => {

    validateNum.mockReturnValue(true)
    existsHelper.mockReturnValue(true)
    matchProp.mockReturnValue(true)
    
    return request(app)
      .patch('/games/gameId=:gameId')
      .expect(400)
      .expect('Game ID cannot be changed')
  })
})