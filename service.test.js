const { listGames } = require("./database")
const { validateNum, existsHelper, findProperty } = require("./service")

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

describe('Test validateNum', () => {
  it('Test that a number returns true', () => {
    expect(validateNum(1)).toBe(true)
  })
  it('Test that a string returns false', () => {
    expect(validateNum('test string')).toBe(false)
  })
})

describe('Test existsHelper', () => {
  it('Test nested object returns true', () => {
    expect(existsHelper(1, 'publisher', 'publisherId')).toBe(true)
  })
  it('Test nested object returns false', () => {
    expect(existsHelper(500000, 'publisher', 'publisherId')).toBe(false)
  })
  it('Test object returns true', () => {
    expect(existsHelper(1, 'gameId')).toBe(true)
  })
  it('Test object returns false', () => {
    expect(existsHelper('Blonic the Bledgeblog 30', 'title')).toBe(false)
  })
})

describe('Test findProperty', () => {
  it('Test returns target object', () => {
    expect(findProperty('gameId', 1)).toBe(testGameList[0])
  })
  it('Test returns undefined object', () => {
    expect(findProperty('gameId', 200000)).toBe(undefined)
  })
})