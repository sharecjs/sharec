const { fixtures } = require('testUtils')
const { pipe } = require('../pipe')

describe('strategies > pipes > eslintignore', () => {
  const eslintignoreBaseFxt = fixtures('atomic/eslintignore/lines/00-base')

  it('should process eslintignore configs', () => {
    expect(pipe('.eslintignore')(eslintignoreBaseFxt)).toWraplessEqual(eslintignoreBaseFxt.result)
  })
})
