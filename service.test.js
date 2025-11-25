const { listGames } = require("./database")
const { validateNum, existsHelper, findProperty, findPropertyIndex, updateProps, matchProp, makeList } = require("./service")

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
  it('Nested object should return true', async () => {
    expect(await existsHelper(1, 'publisher', 'publisherId')).toBe(true)
  })
  it('Nested object should return false', async () => {
    expect(await existsHelper(500000, 'publisher', 'publisherId')).toBe(false)
  })
  it('Object should return true', async () => {
    expect(await existsHelper(1, 'gameId')).toBe(true)
  })
  it('Object should return false', async () => {
    expect(await existsHelper('Blonic the Bledgeblog 30', 'title')).toBe(false)
  })
})

describe('Test findProperty', () => {
  it('Should return target object', async () => {
    expect(await findProperty('gameId', 1)).toBe(testGameList[0])
  })
  it('Should return target undefined object', async () => {
    expect(await findProperty('gameId', 200000)).toBe(undefined)
  })
  it('Should return target undefined object', async () => {
    expect(await findProperty('someId', 1)).toBe(undefined)
  })
})

describe('Test findPropertyIndex', () => {
  it('Should return target object index', async () => {
    expect(await findPropertyIndex('gameId', 1)).toBe(0)
  })
  it('Should return target negative index', async () => {
    expect(await findPropertyIndex('gameId', 200000)).toBe(-1)
  })
  it('Should return target negative index', async () => {
    expect(await findPropertyIndex('someId', 1)).toBe(-1)
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

describe('Test makeList', () => {
  it('Should return list from listGames()', async () => {
    expect(await makeList(1, 'publisher', 'publisherId')).toStrictEqual(testGameList)
  })
  it('Should return empty list', async () => {
    expect(await makeList(2, 'publisher', 'publisherId')).toStrictEqual([])
  })
})
