const { fixtures } = require('testUtils')
const { pipe } = require('../pipe')

describe('strategies > pipes > npmignore', () => {
  const npmignoreBaseFxt = fixtures('atomic/npmignore/lines/00-base')

  it('should process npmignore configs', () => {
    expect(pipe('.npmignore')(npmignoreBaseFxt)).toEqual(npmignoreBaseFxt.result)
  })
})
