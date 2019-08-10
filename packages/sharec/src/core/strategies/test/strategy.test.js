const { fixture } = require('testUtils')
const { Strategy, LinearStrategy } = require('../strategy')

describe('Strategy', () => {
  const commonCurrentJSON = fixture('common/json/01-base/current.json', 'json')
  const commonNewJSON = fixture('common/json/01-base/new.json', 'json')
  const commonResultJSON = fixture('common/json/01-base/result.json', 'json')
  const commonRestoredJSON = fixture(
    'common/json/01-base/restored.json',
    'json',
  )
  const commonCurrentYAML = fixture('common/yaml/01-base/current.yml')
  const commonNewYAML = fixture('common/yaml/01-base/new.yml')
  const commonResultYAML = fixture('common/yaml/01-base/result.yml')
  const commonRestoredYAML = fixture('common/yaml/01-base/restored.yml')
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
    expect(strategy.mergeJSON(commonCurrentJSON, commonNewJSON)).toEqual(
      commonResultJSON,
    )
  })

  it('should merge YAML configs', () => {
    expect(strategy.mergeYAML(commonCurrentYAML, commonNewYAML)).toEqual(
      commonResultYAML,
    )
  })

  it('should automatically determine and apply merge method to given file', () => {
    expect(
      strategy.merge('common_01.yaml')(commonCurrentYAML, commonNewYAML),
    ).toEqual(commonResultYAML)
  })

  it('should determine unapply method', () => {
    const unapplyJSONMock = Symbol('unapplyJSON')
    const unapplyYAMLMock = Symbol('unapplyYAML')

    strategy.unapplyJSON = unapplyJSONMock
    strategy.unapplyYAML = unapplyYAMLMock

    expect(strategy.determineUnapplyMethod('example.json')).toBe(
      unapplyJSONMock,
    )
    expect(strategy.determineUnapplyMethod('example.yaml')).toBe(
      unapplyYAMLMock,
    )
    expect(strategy.determineUnapplyMethod('example.yml')).toBe(unapplyYAMLMock)
    expect(strategy.determineUnapplyMethod('foo/bar/example.json')).toBe(
      unapplyJSONMock,
    )
    expect(strategy.determineUnapplyMethod('foo/bar/example.yaml')).toBe(
      unapplyYAMLMock,
    )
    expect(strategy.determineUnapplyMethod('foo/bar/example.yml')).toBe(
      unapplyYAMLMock,
    )
  })

  describe('unapply JSON', () => {
    it('should return object without applied properties from second object', () => {
      expect(strategy.unapplyJSON(commonResultJSON, commonNewJSON)).toEqual(
        commonRestoredJSON,
      )
    })

    it('should return empty object if objects have not difference', () => {
      expect(strategy.unapplyJSON(commonResultJSON, commonResultJSON)).toEqual(
        {},
      )
    })
  })

  describe('unapply YAML', () => {
    it('should return YAML string without applied properties from second YAML', () => {
      expect(strategy.unapplyYAML(commonResultYAML, commonNewYAML)).toEqual(
        commonRestoredYAML,
      )
    })

    it('should return empty string if YAML string have not difference', () => {
      expect(strategy.unapplyYAML(commonResultYAML, commonResultYAML)).toBe('')
    })
  })

  describe('auto unapply', () => {
    it('should automatically determine and apply unapply method to given file', () => {
      expect(
        strategy.unapply('common.json')(commonResultJSON, commonNewJSON),
      ).toEqual(commonRestoredJSON)
      expect(
        strategy.unapply('common.yaml')(commonResultYAML, commonNewYAML),
      ).toEqual(commonRestoredYAML)
    })
  })
})

describe('LinearStrategy', () => {
  const gitignoreCurrent = fixture('gitignore/01-base/current.txt')
  const gitignoreNew = fixture('gitignore/01-base/new.txt')
  const gitignoreResult = fixture('gitignore/01-base/result.txt')
  const gitignoreRestored = fixture('gitignore/01-base/restored.txt')
  let strategy

  beforeEach(() => {
    strategy = new LinearStrategy()
  })

  it('should check given filename on matching and return boolean result', () => {
    strategy = new LinearStrategy(['.gitignore', '.npmignore'])

    expect(strategy.isExpectedStrategy('.gitignore')).toBe(true)
    expect(strategy.isExpectedStrategy('.npmignore')).toBe(true)
    expect(strategy.isExpectedStrategy('.babelrc')).toBe(false)
  })

  it('should merge linear text files', () => {
    expect(strategy.merge()(gitignoreCurrent, gitignoreNew)).toEqual(
      gitignoreResult,
    )
  })

  it('should unapply upcoming changes from linear text files', () => {
    expect(strategy.unapply()(gitignoreResult, gitignoreNew)).toEqual(
      gitignoreRestored,
    )
  })
})
