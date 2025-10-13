const { listGames } = require("./database")

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

describe('Test listGames', () => {
  it('Should return value of object from array', () => {
    expect(listGames()[0]['gameId']).toBe(1)
  })
})
