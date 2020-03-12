const { fixtures } = require('testUtils')
const gitignorePipe = require('../pipe')

describe('strategies > pipes > gitignore', () => {
  const gitignoreBaseFxt = fixtures('atomic/gitignore/lines/00-base')

  it('should process gitignore configs', () => {
    expect(gitignorePipe('.gitignore')(gitignoreBaseFxt)).toEqual(
      gitignoreBaseFxt.result,
    )
  })
})
