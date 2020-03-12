const { fixtures } = require('testUtils')
const npmignorePipe = require('../pipe')

describe('strategies > pipes > npmignore', () => {
  const npmignoreBaseFxt = fixtures('atomic/npmignore/lines/00-base')

  it('should process npmignore configs', () => {
    expect(npmignorePipe('.npmignore')(npmignoreBaseFxt)).toEqual(
      npmignoreBaseFxt.result,
    )
  })
})
