const path = require('path')
const { diffLines } = require('diff')
const { hashesDiff } = require('../../utils/hashes')
const { transformInputToYAML, toYaml } = require('../../utils/yaml')

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

  mergeJSON(a = {}, b = {}) {
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
     * @param {Object|String} localConfig
     * @param {Object|String} config
     * @returns {Object|String}
     */
    return (localConfig, config) => {
      if (fileName === 'dependencies') {
        console.log(localConfig, config)
      }

      if (!matchedMethod) return config

      const res = matchedMethod.bind(this)(localConfig, config)

      return res
    }
  }

  unapplyJSON(a, b) {
    return hashesDiff(a, b)
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
     * @param {Object|String} localConfig
     * @param {Object|String} config
     * @returns {Object|String}
     */
    return (localConfig, config) => {
      if (!matchedMethod) return localConfig

      return matchedMethod.bind(this)(localConfig, config)
    }
  }
}

class LinearStrategy {
  constructor(matchers) {
    this.matchers = matchers || []
  }

  isExpectedStrategy(fileName) {
    const baseFileName = path.basename(fileName)

    return !!this.matchers.find(match => {
      if (match instanceof RegExp) {
        return match.test(baseFileName)
      }

      return match === baseFileName
    })
  }

  merge() {
    /**
     * @param {String} a
     * @param {String} b
     * @returns {String}
     */
    return (a, b) => {
      return diffLines(a, b).reduce((acc, line) => {
        if (line.added) {
          return [acc, line.value].join('')
        }

        return acc
      }, a)
    }
  }

  /**
   * @param {String} a
   * @param {String} b
   * @returns {String}
   */
  unapply() {
    return (a, b) => {
      const aLines = a.split('\n')
      const restoredConfig = []

      diffLines(a, b).forEach(line => {
        const lineIdx = aLines.indexOf(line.value.replace(/\n$/, ''))

        if (line.removed && lineIdx !== -1) {
          restoredConfig.push(line.value)
        }
      })

      if (restoredConfig.length === 0) {
        return ''
      }

      return restoredConfig.join('\n')
    }
  }
}

module.exports = { Strategy, LinearStrategy }
