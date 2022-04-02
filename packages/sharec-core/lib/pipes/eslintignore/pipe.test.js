const { fixtures } = require('testUtils')
const { pipe } = require('./pipe')

describe('strategies > pipes > eslintignore', () => {
  const eslintignoreBaseFxt = fixtures('eslintignore/lines/00-base')

  it('should process eslintignore configs', () => {
    expect(pipe('.eslintignore')(eslintignoreBaseFxt)).toMatchSnapshot()
  })
})
