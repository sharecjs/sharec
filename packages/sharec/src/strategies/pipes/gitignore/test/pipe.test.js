const { fixtures } = require('testUtils')
const { pipe } = require('../pipe')

describe('strategies > pipes > gitignore', () => {
  const gitignoreBaseFxt = fixtures('atomic/gitignore/lines/00-base')

  it('should process gitignore configs', () => {
    expect(pipe('.gitignore')(gitignoreBaseFxt)).toWraplessEqual(gitignoreBaseFxt.result)
  })
})
