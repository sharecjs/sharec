const { fixtures } = require('testUtils')
const { pipe } = require('../pipe')

describe('strategies > pipes > commitlint > pipe', () => {
  describe('JSON', () => {
    const commitlintFxt = fixtures('commitlint/json/00-base')

    it('should merge configs', () => {
      expect(pipe('.commitlintrc.json')(commitlintFxt)).toWraplessEqual(commitlintFxt.result)
    })
  })

  describe('YAML', () => {
    const commitlintFxt = fixtures('commitlint/yaml/00-base')

    it('should merge configs', () => {
      expect(pipe('.commitlintrc.yaml')(commitlintFxt)).toWraplessEqual(commitlintFxt.result)
    })
  })
})
