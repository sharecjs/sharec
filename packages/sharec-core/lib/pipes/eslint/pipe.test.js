const { fixtures } = require('testUtils')
const { pipe } = require('./pipe')

describe('strategies > pipes > eslint > pipe', () => {
  describe('JSON', () => {
    const eslintFxt = fixtures('eslint/json/01-base')

    it('should merge configs', () => {
      expect(pipe('.eslintrc')(eslintFxt)).toMatchSnapshot()
    })
  })

  describe('YAML', () => {
    const eslintFxt = fixtures('eslint/yaml/01-base')

    it('should merge configs', () => {
      expect(pipe('.eslintrc.yaml')(eslintFxt)).toMatchSnapshot()
    })
  })
})
