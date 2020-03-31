const { fixtures } = require('testUtils')
const { pipe } = require('../pipe')

describe('strategies > pipes > eslint > pipe', () => {
  describe('JSON', () => {
    const defaultFxt = fixtures('atomic/default/json/00-base')

    it('should merge configs', () => {
      expect(pipe('foo.json')(defaultFxt)).toEqual(defaultFxt.result)
    })
  })

  describe('YAML', () => {
    const defaultFxt = fixtures('atomic/default/yaml/00-base')

    it('should merge configs', () => {
      expect(pipe('foo.yaml')(defaultFxt)).toEqual(defaultFxt.result)
      expect(pipe('foo.yml')(defaultFxt)).toEqual(defaultFxt.result)
    })
  })
})
