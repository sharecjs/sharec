const path = require('path')
const { hashesChangesDiff } = require('./hashes')
const { transformInputToYAML, toYaml } = require('./yaml')

class Strategy {
  constructor(matchers) {
    this.matchers = matchers || {
      json: [/\.json/],
      yaml: [/\.ya?ml/],
    }
  }

  isExpectedStrategy(fileName) {
    return !!this.getExpectedMatcherKey(fileName)
  }

  getExpectedMatcherKey(fileName) {
    return Object.keys(this.matchers).find(key =>
      this.checkFileWithMatcher(key, fileName),
    )
  }

  checkFileWithMatcher(matcherKey, fileName) {
    const targetMatcher = this.matchers[matcherKey]

    if (!targetMatcher) return false

    const baseFileName = path.basename(fileName)

    return !!targetMatcher.find(match => {
      if (match instanceof RegExp) {
        return match.test(baseFileName)
      }

      return match === baseFileName
    })
  }

  determineMergeMethod(fileName) {
    const matcherKey = this.getExpectedMatcherKey(fileName)

    switch (matcherKey) {
      case 'json':
        return this.mergeJSON
      case 'yaml':
        return this.mergeYAML
      default:
        return null
    }
  }

  determineUnapplyMethod(fileName) {
    const matcherKey = this.getExpectedMatcherKey(fileName)

    switch (matcherKey) {
      case 'json':
        return this.unapplyJSON
      case 'yaml':
        return this.unapplyYAML
      default:
        return null
    }
  }

  mergeJSON(a, b) {
    return {
      ...a,
      ...b,
    }
  }

  mergeYAML(rawA, rawB) {
    const [a, b] = transformInputToYAML(rawA, rawB)
    const newConfig = this.mergeJSON(a, b)

    return toYaml(newConfig)
  }

  /**
   * @param {String} fileName
   * @returns {Function} Merge function
   */
  merge(fileName) {
    const matchedMethod = this.determineMergeMethod(fileName)

    /**
     * @param {Object|String} a
     * @param {Object|String} b
     * @returns {[type]}
     */
    return (a, b) => {
      if (!matchedMethod) return b

      const res = matchedMethod.bind(this)(a, b)

      return res
    }
  }

  unapplyJSON(a, b) {
    return hashesChangesDiff(b, a)
  }

  unapplyYAML(rawA, rawB) {
    const [a, b] = transformInputToYAML(rawA, rawB)
    const clearedConfig = this.unapplyJSON(a, b)

    return toYaml(clearedConfig)
  }

  /**
   * @param {String} fileName
   * @returns {Function} Unapply function
   */
  unapply(fileName) {
    const matchedMethod = this.determineUnapplyMethod(fileName)

    /**
     * @param {Object|String} a Package config
     * @param {Object|String} b Current config
     * @returns {Object|String}
     */
    return (a, b) => {
      if (!matchedMethod) return a

      const res = matchedMethod.bind(this)(b, a)

      return res
    }
  }
}

module.exports = { Strategy }
