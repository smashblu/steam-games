const { validateNum } = require("./service")

describe('Test validateNum', () => {
  it('Test that a number returns true', () => {
    expect(validateNum(1)).toBe(true)
  })
  it('Test that a string returns false', () => {
    expect(validateNum('test string')).toBe(false)
  })
})

