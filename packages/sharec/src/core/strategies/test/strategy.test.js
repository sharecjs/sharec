const { fixtures } = require('testUtils')
const Strategy = require('../Strategy')

describe('Strategy', () => {
  const commonBaseFxt = fixtures('common/json/01-base', 'json')
  const commonBaseFxtYaml = fixtures('common/yaml/01-base')
  const commonListsFxt = fixtures('common/json/02-lists', 'json')
  const commonListsFxtYaml = fixtures('common/yaml/02-lists')
  const gitignoreBaseFxt = fixtures('gitignore/01-base')

  let strategy

  beforeEach(() => {
    strategy = new Strategy()
  })

  it('should checks files compatibility', () => {
    const validFiles = [
      'foo.json',
      'bar.json',
      'foo.yaml',
      'bar.yaml',
      'foo.txt',
      'bar.txt',
    ]
    const invalidFiles = [
      'beep.json',
      'boop.json',
      'beep.yaml',
      'boop.yaml',
      'beep.txt',
      'boop.txt',
    ]

    strategy = new Strategy({
      json: validFiles.slice(0, 2),
      yaml: validFiles.slice(2, 4),
      lines: validFiles.slice(4, 6),
    })

    validFiles.forEach(file => {
      expect(strategy.isExpectedStrategy(file)).toBe(true)
    })
    invalidFiles.forEach(file => {
      expect(strategy.isExpectedStrategy(file)).toBe(false)
    })
  })

  describe('determination', () => {
    it('should determine merge method', () => {
      const mergeJSONMock = Symbol('mergeJSON')
      const mergeYAMLMock = Symbol('mergeYAML')
      const mergeLinesMock = Symbol('mergeLines')

      strategy.mergeJSON = mergeJSONMock
      strategy.mergeYAML = mergeYAMLMock
      strategy.mergeLines = mergeLinesMock

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
      expect(strategy.determineMergeMethod('foo/bar/example.txt')).toBe(
        mergeLinesMock,
      )
    })

    it('should determine unapply method', () => {
      const unapplyJSONMock = Symbol('unapplyJSON')
      const unapplyYAMLMock = Symbol('unapplyYAML')
      const unapplyLinesMock = Symbol('unapplyLines')

      strategy.unapplyJSON = unapplyJSONMock
      strategy.unapplyYAML = unapplyYAMLMock
      strategy.unapplyLines = unapplyLinesMock

      expect(strategy.determineUnapplyMethod('example.json')).toBe(
        unapplyJSONMock,
      )
      expect(strategy.determineUnapplyMethod('example.yaml')).toBe(
        unapplyYAMLMock,
      )
      expect(strategy.determineUnapplyMethod('example.yml')).toBe(
        unapplyYAMLMock,
      )
      expect(strategy.determineUnapplyMethod('foo/bar/example.json')).toBe(
        unapplyJSONMock,
      )
      expect(strategy.determineUnapplyMethod('foo/bar/example.yaml')).toBe(
        unapplyYAMLMock,
      )
      expect(strategy.determineUnapplyMethod('foo/bar/example.yml')).toBe(
        unapplyYAMLMock,
      )
      expect(strategy.determineUnapplyMethod('foo/bar/example.txt')).toBe(
        unapplyLinesMock,
      )
    })
  })

  describe('JSON', () => {
    it('should merge JSON configs', () => {
      expect(
        strategy.mergeJSON(commonBaseFxt.current, commonBaseFxt.new),
      ).toEqual(commonBaseFxt.result)
    })

    it('should merge lists', () => {
      expect(
        strategy.mergeJSON(commonListsFxt.current, commonListsFxt.new),
      ).toEqual(commonListsFxt.result)
    })

    it('should return object without applied properties from second object', () => {
      expect(
        strategy.unapplyJSON(commonBaseFxt.result, commonBaseFxt.new),
      ).toEqual(commonBaseFxt.restored)
    })

    it('should return empty object if objects have not difference', () => {
      expect(
        strategy.unapplyJSON(commonBaseFxt.result, commonBaseFxt.result),
      ).toEqual({})
    })

    it('should unapply lists', () => {
      expect(
        strategy.unapplyJSON(commonListsFxt.result, commonListsFxt.new),
      ).toEqual(commonListsFxt.restored)
    })
  })

  describe('YAML', () => {
    it('should merge YAML configs', () => {
      expect(
        strategy.mergeYAML(commonBaseFxtYaml.current, commonBaseFxtYaml.new),
      ).toEqual(commonBaseFxtYaml.result)
    })

    it('should merge lists', () => {
      expect(
        strategy.mergeYAML(commonListsFxtYaml.current, commonListsFxtYaml.new),
      ).toEqual(commonListsFxtYaml.result)
    })

    it('should return YAML string without applied properties from second YAML', () => {
      expect(
        strategy.unapplyYAML(commonBaseFxtYaml.result, commonBaseFxtYaml.new),
      ).toEqual(commonBaseFxtYaml.restored)
    })

    it('should return empty string if YAML string have not difference', () => {
      expect(
        strategy.unapplyYAML(
          commonBaseFxtYaml.result,
          commonBaseFxtYaml.result,
        ),
      ).toBe('')
    })

    it('should unapply lists', () => {
      expect(
        strategy.unapplyYAML(commonListsFxtYaml.result, commonListsFxtYaml.new),
      ).toEqual(commonListsFxtYaml.restored)
    })
  })

  describe('Lines', () => {
    it('should merge linear text files', () => {
      expect(
        strategy.mergeLines(gitignoreBaseFxt.current, gitignoreBaseFxt.new),
      ).toEqual(gitignoreBaseFxt.result)
    })

    it('should unapply upcoming changes from linear text files', () => {
      expect(
        strategy.unapplyLines(gitignoreBaseFxt.result, gitignoreBaseFxt.new),
      ).toEqual(gitignoreBaseFxt.restored)
    })
  })

  describe('auto', () => {
    it('should automatically determine and apply merge method to given file', () => {
      expect(
        strategy.merge('common_01.json')(
          commonBaseFxt.current,
          commonBaseFxt.new,
        ),
      ).toEqual(commonBaseFxt.result)
      expect(
        strategy.merge('common_01.yaml')(
          commonBaseFxtYaml.current,
          commonBaseFxtYaml.new,
        ),
      ).toEqual(commonBaseFxtYaml.result)
      expect(
        strategy.merge('common_01.yaml')(
          commonBaseFxtYaml.current,
          commonBaseFxtYaml.new,
        ),
      ).toEqual(commonBaseFxtYaml.result)
    })

    it('should automatically determine and apply unapply method to given file', () => {
      expect(
        strategy.unapply('common.json')(
          commonBaseFxt.result,
          commonBaseFxt.new,
        ),
      ).toEqual(commonBaseFxt.restored)
      expect(
        strategy.unapply('common.yaml')(
          commonBaseFxtYaml.result,
          commonBaseFxtYaml.new,
        ),
      ).toEqual(commonBaseFxtYaml.restored)
      expect(
        strategy.unapply('common.txt')(
          gitignoreBaseFxt.result,
          gitignoreBaseFxt.new,
        ),
      ).toEqual(gitignoreBaseFxt.restored)
    })
  })
})
