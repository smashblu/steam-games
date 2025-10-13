const request = require('supertest')
const { app, server} = require('./index')
const { listGames, addGame, delGame } = require("./database")
const { existsHelper, validateNum, findProperty, findPropertyIndex, makeList, matchProp, updateProps } = require('./service')

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

describe('Preflight test', () => {
  it('Number should return true', () => {
    const testFunc = () => {
        return true
    }
    expect(testFunc()).toBe(true)
  })
})