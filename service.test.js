const { listGames } = require("./database")
const { validateNum, existsHelper, findProperty, findPropertyIndex } = require("./service")

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
  it('Number should return true', () => {
    expect(validateNum(1)).toBe(true)
  })
  it('String should returns false', () => {
    expect(validateNum('test string')).toBe(false)
  })
})

describe('Test existsHelper', () => {
  it('Nested object should return true', () => {
    expect(existsHelper(1, 'publisher', 'publisherId')).toBe(true)
  })
  it('Nested object should return false', () => {
    expect(existsHelper(500000, 'publisher', 'publisherId')).toBe(false)
  })
  it('Object should return true', () => {
    expect(existsHelper(1, 'gameId')).toBe(true)
  })
  it('Object should return false', () => {
    expect(existsHelper('Blonic the Bledgeblog 30', 'title')).toBe(false)
  })
})

describe('Test findProperty', () => {
  it('Should return target object', () => {
    expect(findProperty('gameId', 1)).toBe(testGameList[0])
  })
  it('Should return target undefined object', () => {
    expect(findProperty('gameId', 200000)).toBe(undefined)
  })
  it('Should return target undefined object', () => {
    expect(findProperty('someId', 1)).toBe(undefined)
  })
})

describe('Test findPropertyIndex', () => {
  it('Should return target object index', () => {
    expect(findPropertyIndex('gameId', 1)).toBe(0)
  })
  it('Should return target negative index', () => {
    expect(findPropertyIndex('gameId', 200000)).toBe(-1)
  })
  it('Should return target negative index', () => {
    expect(findPropertyIndex('someId', 1)).toBe(-1)
  })
})
