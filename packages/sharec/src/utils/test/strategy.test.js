const path = require('path')
const { Strategy } = require('../strategy')
const { readFileSync } = require.requireActual('fs')

describe('strategy', () => {
  const common01 = require('fixtures/common/json/common_01.json')
  const common02 = require('fixtures/common/json/common_02.json')
  const commonYaml01 = readFileSync(
    path.resolve(__dirname, '../../../test/fixtures/common/yaml/common_01.yml'),
    'utf8',
  )
  const commonYaml02 = readFileSync(
    path.resolve(__dirname, '../../../test/fixtures/common/yaml/common_02.yml'),
    'utf8',
  )

  describe('Strategy class', () => {
    let strategy

    beforeEach(() => {
      strategy = new Strategy()
    })

    it('should checks files compatibility', () => {
      const validFiles = ['foo.json', 'bar.json', 'foo.yaml', 'bar.yaml']
      const invalidFiles = ['beep.json', 'boop.json', 'beep.yaml', 'boop.yaml']

      strategy = new Strategy({
        json: validFiles.slice(0, 2),
        yaml: validFiles.slice(2, 4),
      })

      validFiles.forEach(file => {
        expect(strategy.isExpectedStrategy(file)).toBe(true)
      })
      invalidFiles.forEach(file => {
        expect(strategy.isExpectedStrategy(file)).toBe(false)
      })
    })

    it('should determine merge method', () => {
      const mergeJSONMock = Symbol('mergeJSON')
      const mergeYAMLMock = Symbol('mergeYAML')

      strategy.mergeJSON = mergeJSONMock
      strategy.mergeYAML = mergeYAMLMock

      expect(strategy.determineMergeMethod('example.json')).toBe(mergeJSONMock)
      expect(strategy.determineMergeMethod('example.yaml')).toBe(mergeYAMLMock)
      expect(strategy.determineMergeMethod('example.yml')).toBe(mergeYAMLMock)
      expect(strategy.determineMergeMethod('foo/bar/example.json')).toBe(
        mergeJSONMock,
      )
      expect(strategy.determineMergeMethod('foo/bar/example.yaml')).toBe(
        mergeYAMLMock,
      )
      expect(strategy.determineMergeMethod('foo/bar/example.yml')).toBe(
        mergeYAMLMock,
      )
    })

    it('should merge JSON configs', () => {
      expect(strategy.mergeJSON(common01, common02)).toMatchSnapshot()
    })

    it('should merge YAML configs', () => {
      expect(strategy.mergeYAML(commonYaml01, commonYaml02)).toMatchSnapshot()
    })

    it('should automatically determine and apply merge method to given file', () => {
      expect(
        strategy.merge('common_01.yaml')(commonYaml01, commonYaml02),
      ).toMatchSnapshot()
    })
  })
})
