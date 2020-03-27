const { fixtures } = require('testUtils')
const { babelStrategy } = require('../../babel')

describe('strategy > babel > with empty > ', () => {
  const babelUniqueEnvFxt = fixtures('babel/json/03-unique-env', 'json')

  it('should handle merge with empty config', () => {
    expect(
      babelStrategy.mergeJSON({
        current: babelUniqueEnvFxt.current,
        upcoming: babelUniqueEnvFxt.upcoming,
      }),
    ).toEqual(babelUniqueEnvFxt.result)
    expect(
      babelStrategy.mergeJSON({
        upcoming: babelUniqueEnvFxt.upcoming,
        current: babelUniqueEnvFxt.current,
      }),
    ).toEqual(babelUniqueEnvFxt.result)
  })

  it('should fully unapply babel JSON config', () => {
    expect(
      babelStrategy.unapplyJSON({
        current: babelUniqueEnvFxt.result,
        upcoming: babelUniqueEnvFxt.upcoming,
      }),
    ).toEqual(babelUniqueEnvFxt.restored)
  })
})
