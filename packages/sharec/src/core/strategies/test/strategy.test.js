const { fixture } = require('testUtils')
const { Strategy, LinearStrategy } = require('../strategy')

describe('strategy', () => {
  let strategy

  describe('Strategy class', () => {
    const common01 = fixture('common/json/common_01.json', 'json')
    const common02 = fixture('common/json/common_02.json', 'json')
    const common04 = fixture('common/json/common_04.json', 'json')
    const common05 = fixture('common/json/common_05.json', 'json')
    const commonYaml01 = fixture('common/yaml/common_01.yml')
    const commonYaml02 = fixture('common/yaml/common_02.yml')
    const commonYaml04 = fixture('common/yaml/common_04.yml')
    const commonYaml05 = fixture('common/yaml/common_05.yml')

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
    })

    describe('unapply JSON', () => {
      it('should return object without applied properties from second object', () => {
        expect(strategy.unapplyJSON(common04, common05)).toMatchSnapshot()
      })

      it('should return empty object if objects have not difference', () => {
        expect(strategy.unapplyJSON(common04, common04)).toEqual({})
      })
    })

    describe('unapply YAML', () => {
      it('should return YAML string without applied properties from second YAML', () => {
        expect(
          strategy.unapplyYAML(commonYaml04, commonYaml05),
        ).toMatchSnapshot()
      })

      it('should return empty string if YAML string have not difference', () => {
        expect(strategy.unapplyYAML(commonYaml04, commonYaml04)).toBe('')
      })
    })

    describe('auto unapply', () => {
      it('should automatically determine and apply unapply method to given file', () => {
        expect(
          strategy.unapply('common.json')(common04, common05),
        ).toMatchSnapshot()
        expect(
          strategy.unapply('common.yaml')(commonYaml04, commonYaml05),
        ).toMatchSnapshot()
      })
    })
  })

  describe('LinearStrategy class', () => {
    const gitignoreCurrent = fixture('gitignore/01-base/current.txt')
    const gitignoreNew = fixture('gitignore/01-base/new.txt')
    const gitignoreResult = fixture('gitignore/01-base/result.txt')
    const gitignoreRestored = fixture('gitignore/01-base/restored.txt')

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
})
