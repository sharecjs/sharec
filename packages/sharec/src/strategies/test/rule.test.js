const { fixtures } = require('testUtils')
const ruleStrategy = require('../rule')

describe('strategies > rule', () => {
  const eslintRuleFxt = fixtures('rule/json/00-eslint', 'json')

  it('should return current if upcoming is not passed', () => {
    const result = ruleStrategy({ current: eslintRuleFxt.current })

    expect(result).toEqual(eslintRuleFxt.current)
  })

  it('should return upcoming if current is not passed', () => {
    const result = ruleStrategy({ upcoming: eslintRuleFxt.upcoming })

    expect(result).toEqual(eslintRuleFxt.upcoming)
  })

  it('should merge rules', () => {
    const result = ruleStrategy({
      current: eslintRuleFxt.current,
      upcoming: eslintRuleFxt.upcoming,
    })

    expect(result).toEqual(eslintRuleFxt.result)
  })

  it('should handle primitive types', () => {
    expect(
      ruleStrategy({
        current: 0,
        upcoming: 1,
      }),
    ).toEqual(1)
    expect(
      ruleStrategy({
        current: 'error',
        upcoming: 'warning',
      }),
    ).toEqual('warning')
  })

  it('should rewrite rule on types mismatching', () => {
    expect(
      ruleStrategy({
        current: eslintRuleFxt.current,
        upcoming: 'error',
      }),
    ).toEqual('error')
    expect(
      ruleStrategy({
        current: 'error',
        upcoming: eslintRuleFxt.upcoming,
      }),
    ).toEqual(eslintRuleFxt.upcoming)
  })
})
