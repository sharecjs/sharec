const eslintStrategy = require('../eslint')

const eslint01 = require('./fixtures/eslint/json/eslintrc_01.json')
const eslint02 = require('./fixtures/eslint/json/eslintrc_02.json')
const eslint03 = require('./fixtures/eslint/json/eslintrc_03.json')

describe('strategy > eslint', () => {
  it('should merge eslint json configs', () => {
    const res = eslintStrategy(eslint01, eslint02)

    expect(res).toEqual(eslint03)
  })
})
