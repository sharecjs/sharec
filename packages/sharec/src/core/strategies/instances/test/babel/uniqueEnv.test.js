const { fixtures } = require('testUtils')
const { babelStrategy } = require('../../babel')

describe('strategy > babel > with empty > ', () => {
  const babelUniqueEnvFxt = fixtures('babel/json/03-unique-env', 'json')

  it('should handle merge with empty config', () => {
    expect(
      babelStrategy.mergeJSON(babelUniqueEnvFxt.current, babelUniqueEnvFxt.new),
    ).toEqual(babelUniqueEnvFxt.result)
    expect(
      babelStrategy.mergeJSON(babelUniqueEnvFxt.new, babelUniqueEnvFxt.current),
    ).toEqual(babelUniqueEnvFxt.result)
  })

  it('should fully unapply babel JSON config', () => {
    expect(
      babelStrategy.unapplyJSON(
        babelUniqueEnvFxt.result,
        babelUniqueEnvFxt.new,
      ),
    ).toEqual(babelUniqueEnvFxt.restored)
  })
})
