const { fixtures } = require('testUtils')
const { pipe } = require('../pipe')

describe('strategies > pipes > eslint > pipe', () => {
  describe('JSON', () => {
    const defaultFxt = fixtures('default/json/00-base')

    it('should merge configs', () => {
      expect(pipe('foo.json')(defaultFxt)).toWraplessEqual(defaultFxt.result, {
        eof: false,
      })
    })
  })

  describe('YAML', () => {
    const defaultFxt = fixtures('default/yaml/00-base')

    it('should merge configs', () => {
      expect(pipe('foo.yaml')(defaultFxt)).toWraplessEqual(defaultFxt.result, {
        eof: false,
      })
      expect(pipe('foo.yml')(defaultFxt)).toWraplessEqual(defaultFxt.result, {
        eof: false,
      })
    })
  })
})
