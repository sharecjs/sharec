const { fixtures } = require('testUtils')
const { yaspellerJson } = require('../yaspeller')

describe('schemas > yaspeller', () => {
  const yaspellerBaseFxt = fixtures('yaspeller/json/01-base', 'json')

  it('should merge yaspeller json configs', () => {
    expect(yaspellerJson(yaspellerBaseFxt)).toMatchObject(
      yaspellerBaseFxt.result,
    )
  })
})
