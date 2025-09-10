const { validateNum, existsHelper } = require("./service")

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