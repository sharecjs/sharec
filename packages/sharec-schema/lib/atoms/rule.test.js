const { fixtures } = require('testUtils')
const ruleAtom = require('./rule')

describe('atoms > rule', () => {
  const eslintRuleFxt = fixtures('rule/json/00-eslint', 'map')

  it('should return current if upcoming is not passed', () => {
    const result = ruleAtom({ current: eslintRuleFxt.current })

    expect(result).toEqual(eslintRuleFxt.current)
  })

  it('should return upcoming if current is not passed', () => {
    const result = ruleAtom({ upcoming: eslintRuleFxt.upcoming })

    expect(result).toEqual(eslintRuleFxt.upcoming)
  })

  it('should merge rules', () => {
    const result = ruleAtom({
      current: eslintRuleFxt.current,
      upcoming: eslintRuleFxt.upcoming,
    })

    expect(result).toEqual(eslintRuleFxt.result)
  })

  it('should handle primitive types', () => {
    expect(
      ruleAtom({
        current: 0,
        upcoming: 1,
      }),
    ).toEqual(1)
    expect(
      ruleAtom({
        current: 'error',
        upcoming: 'warning',
      }),
    ).toEqual('warning')
  })

  it('should rewrite rule on types mismatching', () => {
    expect(
      ruleAtom({
        current: eslintRuleFxt.current,
        upcoming: 'error',
      }),
    ).toEqual('error')
    expect(
      ruleAtom({
        current: 'error',
        upcoming: eslintRuleFxt.upcoming,
      }),
    ).toEqual(eslintRuleFxt.upcoming)
  })
})
