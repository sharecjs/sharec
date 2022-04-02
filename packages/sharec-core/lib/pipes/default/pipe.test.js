const { fixtures } = require('testUtils')
const { pipe } = require('./pipe')

describe('strategies > pipes > eslint > pipe', () => {
  describe('JSON', () => {
    const defaultFxt = fixtures('default/json/00-base')

    it('should merge configs', () => {
      expect(pipe('foo.json')(defaultFxt)).toMatchSnapshot()
    })
  })

  describe('YAML', () => {
    const defaultFxt = fixtures('default/yaml/00-base')

    it('should merge configs', () => {
      expect(pipe('foo.yaml')(defaultFxt)).toMatchSnapshot()
      expect(pipe('foo.yml')(defaultFxt)).toMatchSnapshot()
    })
  })
})
