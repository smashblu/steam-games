const { listGames } = require("./database")
const { validateNum, updateProps, matchProp } = require("./service")

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

describe('Test updateProps', () => {
  it('Should change specific object properties', () => {
    const testObj = {gameId: 2}
    updateProps(testObj, testGameList[0])
    expect(testGameList[0]['gameId']).toBe(2)
  })
  it('Should fail to change object properties', () => {
    const testObj = {someId: 2}
    updateProps(testObj, testGameList[0])
    expect(testGameList[0]['someId']).toBe(undefined)
  })
})

describe('Test matchProp', () => {
  it('Should match property/value and return true', () => {
    const testObj = {gameId: 1}
    expect(matchProp(testGameList[0], 'gameId', testObj['gameId'])).toBe(true)
  })
  it('Should not match property and return false', () => {
    const testObj = {someId: 1}
    expect(matchProp(testGameList[0], 'someId', testObj['someId'])).toBe(false)
  })
  it('Should match property but not value and return false', () => {
    const testObj = {gameId: 2}
    expect(matchProp(testGameList[0], 'gameId', testObj['gameId'])).toBe(false)
  })
})
