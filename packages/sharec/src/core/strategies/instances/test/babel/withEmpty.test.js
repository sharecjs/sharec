const { fixtures } = require('testUtils')
const { babelStrategy } = require('../../babel')

describe('strategy > babel > with empty > ', () => {
  const babelWithEmptyFxt = fixtures('babel/json/02-with-empty', 'json')

  it('should handle merge with empty config', () => {
    expect(
      babelStrategy.mergeJSON(babelWithEmptyFxt.current, babelWithEmptyFxt.new),
    ).toEqual(babelWithEmptyFxt.result)
    expect(
      babelStrategy.mergeJSON(babelWithEmptyFxt.new, babelWithEmptyFxt.current),
    ).toEqual(babelWithEmptyFxt.result)
  })

  it('should fully unapply babel JSON config', () => {
    expect(
      babelStrategy.unapplyJSON(
        babelWithEmptyFxt.result,
        babelWithEmptyFxt.new,
      ),
    ).toEqual(babelWithEmptyFxt.restored)
  })
})
