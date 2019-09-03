const { fixtures } = require('testUtils')
const { babelStrategy } = require('../../babel')

describe('strategy > babel > base >', () => {
  const babelBaseFxt = fixtures('babel/json/01-base', 'json')

  it('should merge babel json configs', () => {
    expect(
      babelStrategy.mergeJSON(babelBaseFxt.current, babelBaseFxt.upcoming),
    ).toEqual(babelBaseFxt.result)
  })

  it('should unapply babel JSON config', () => {
    expect(
      babelStrategy.unapplyJSON(babelBaseFxt.result, babelBaseFxt.upcoming),
    ).toEqual(babelBaseFxt.restored)
  })
})
