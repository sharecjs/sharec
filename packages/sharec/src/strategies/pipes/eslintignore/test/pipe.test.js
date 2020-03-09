const { fixtures } = require('testUtils')
const eslintignorePipe = require('../pipe')

describe('strategies > pipes > eslintignore', () => {
  const eslintignoreBaseFxt = fixtures('eslintignore/lines/00-base')

  it('should process eslintignore configs', () => {
    expect(eslintignorePipe('.eslintignore')(eslintignoreBaseFxt)).toEqual(
      eslintignoreBaseFxt.result,
    )
  })
})
