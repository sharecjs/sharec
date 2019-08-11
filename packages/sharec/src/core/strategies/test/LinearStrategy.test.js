const { fixtures } = require('testUtils')
const LinearStrategy = require('../LinearStrategy')

describe('LinearStrategy', () => {
  const gitignoreBaseFxt = fixtures('gitignore/01-base')
  let strategy

  beforeEach(() => {
    strategy = new LinearStrategy()
  })

  it('should check given filename on matching and return boolean result', () => {
    strategy = new LinearStrategy(['.gitignore', '.npmignore'])

    expect(strategy.isExpectedStrategy('.gitignore')).toBe(true)
    expect(strategy.isExpectedStrategy('.npmignore')).toBe(true)
    expect(strategy.isExpectedStrategy('.babelrc')).toBe(false)
  })

  it('should merge linear text files', () => {
    expect(
      strategy.merge()(gitignoreBaseFxt.current, gitignoreBaseFxt.new),
    ).toEqual(gitignoreBaseFxt.result)
  })

  it('should unapply upcoming changes from linear text files', () => {
    expect(
      strategy.unapply()(gitignoreBaseFxt.result, gitignoreBaseFxt.new),
    ).toEqual(gitignoreBaseFxt.restored)
  })
})
