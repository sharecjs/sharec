const { fixture } = require('testUtils')
const { babelStrategy } = require('../../babel')

describe('strategy > babel > base >', () => {
  const babelCurrent = fixture('babel/json/01-base/current.json', 'json')
  const babelNew = fixture('babel/json/01-base/new.json', 'json')
  const babelResult = fixture('babel/json/01-base/result.json', 'json')
  const babelRestored = fixture('babel/json/01-base/restored.json', 'json')

  it('should merge babel json configs', () => {
    expect(babelStrategy.mergeJSON(babelCurrent, babelNew)).toEqual(babelResult)
  })

  it('should unapply babel JSON config', () => {
    expect(babelStrategy.unapplyJSON(babelResult, babelNew)).toEqual(
      babelRestored,
    )
  })
})
