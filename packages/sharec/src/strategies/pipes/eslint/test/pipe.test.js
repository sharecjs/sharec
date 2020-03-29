const { fixtures } = require('testUtils')
const { pipe } = require('../pipe')

describe('strategies > pipes > eslint > pipe', () => {
  describe('JSON', () => {
    const eslintFxt = fixtures('atomic/eslint/json/01-base')

    it('should merge configs', () => {
      expect(pipe('.eslintrc')(eslintFxt)).toEqual(eslintFxt.result)
    })
  })

  describe('YAML', () => {
    const eslintFxt = fixtures('atomic/eslint/yaml/01-base')

    it('should merge configs', () => {
      expect(pipe('.eslintrc.yaml')(eslintFxt)).toEqual(eslintFxt.result)
    })
  })
})
