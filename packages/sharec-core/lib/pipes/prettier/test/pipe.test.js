const { fixtures } = require('testUtils')
const { pipe } = require('../pipe')

describe('strategies > pipes > prettier > pipe', () => {
  describe('JSON', () => {
    const perttierFxt = fixtures('prettier/json/00-base')

    it('should merge configs', () => {
      expect(pipe('.prettierrc')(perttierFxt)).toMatchSnapshot()
    })
  })

  describe('YAML', () => {
    const perttierFxt = fixtures('prettier/yaml/00-base')

    it('should merge configs', () => {
      expect(pipe('.prettierrc.yaml')(perttierFxt)).toMatchSnapshot()
    })
  })
})
