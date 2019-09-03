const path = require('path')
const { diffLines } = require('diff')
const { mergeLists, listsDiff, normalizeList } = require('../../utils/lists')
const { hashesDiff } = require('../../utils/hashes')
const { transformInputToYAML, toYaml } = require('../../utils/yaml')

/**
 * @typedef {Object} Matchers
 * @property {RegExp[]|String[]} json
 * @property {RegExp[]|String[]} yaml
 * @property {RegExp[]|String[]} lines
 */
class Strategy {
  /**
   * @param {Matchers} matchers
   */
  constructor(matchers) {
    this.matchers = matchers || {
      json: [/\.json/],
      yaml: [/\.ya?ml/],
      lines: [/\.txt/],
    }
  }

  /**
   * @param {Strinf} fileName
   * @returns {Boolean}
   */
  isExpectedStrategy(fileName) {
    return !!this.getExpectedMatcherKey(fileName)
  }

  /**
   * @param {String} fileName
   * @returns {String}
   */
  getExpectedMatcherKey(fileName) {
    return Object.keys(this.matchers).find(key =>
      this.checkFileWithMatcher(key, fileName),
    )
  }

  /**
   * @param {String} matcherKey
   * @param {String} fileName
   * @returns {Boolean}
   */
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

  /**
   * @param {String} fileName
   * @returns {Function|null}
   */
  determineMergeMethod(fileName) {
    const matcherKey = this.getExpectedMatcherKey(fileName)

    switch (matcherKey) {
      case 'json':
        return this.mergeJSON
      case 'yaml':
        return this.mergeYAML
      case 'lines':
        return this.mergeLines
      default:
        return null
    }
  }

  /**
   * @param {String} fileName
   * @returns {Function|null}
   */
  determineUnapplyMethod(fileName) {
    const matcherKey = this.getExpectedMatcherKey(fileName)

    switch (matcherKey) {
      case 'json':
        return this.unapplyJSON
      case 'yaml':
        return this.unapplyYAML
      case 'lines':
        return this.unapplyLines
      default:
        return null
    }
  }

  /**
   * @param {String|Object|Array} rawA
   * @param {String|Object|Array} rawB
   * @returns {Object|Array}
   */
  mergeJSON(rawA, rawB) {
    const [a, b] = [rawA, rawB].map(config =>
      typeof config === 'string' ? JSON.parse(config) : config,
    )

    if (Array.isArray(a) || Array.isArray(b)) {
      return this.mergeJSONLists(a, b)
    }

    return this.mergeJSONHashes(a, b)
  }

  /**
   * @param {Object} a
   * @param {Object} b
   * @returns {Object}
   */
  mergeJSONHashes(a = {}, b = {}) {
    return {
      ...a,
      ...b,
    }
  }

  /**
   * @param {Array} a
   * @param {Array} b
   * @returns {Array}
   */
  mergeJSONLists(a = [], b = []) {
    const res = mergeLists(a, b)

    return normalizeList(res)
  }

  /**
   * @param {String} rawA
   * @param {String} rawB
   * @returns {String}
   */
  mergeYAML(rawA, rawB) {
    const [a, b] = transformInputToYAML(rawA, rawB)
    const newConfig = this.mergeJSON(a, b)

    return toYaml(newConfig)
  }

  /**
   * @param {String} a
   * @param {String} b
   * @returns {String}
   */
  mergeLines(a, b) {
    return diffLines(a, b).reduce((acc, line) => {
      if (line.added) {
        return [acc, line.value].join('')
      }

      return acc
    }, a)
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
     * @returns {Object|Array|String}
     */
    return ({ current, upcoming, cached }) => {
      if (!matchedMethod) return upcoming

      return matchedMethod.bind(this)(current, upcoming, cached)
    }
  }

  /**
   * @param {Object|Array|String} rawA
   * @param {Object|Array|String} rawB
   * @returns {Object|Array}
   */
  unapplyJSON(rawA, rawB) {
    const [a, b] = [rawA, rawB].map(config =>
      typeof config === 'string' ? JSON.parse(config) : config,
    )

    if (Array.isArray(a) && Array.isArray(b)) {
      return this.unapplyJSONLists(a, b)
    }

    return this.unapplyJSONHashes(a, b)
  }

  /**
   * @param {Object} a
   * @param {Object} b
   * @returns {Object}
   */
  unapplyJSONHashes(a, b) {
    return hashesDiff(a, b)
  }

  /**
   * @param {Array} a
   * @param {Array} b
   * @returns {Array}
   */
  unapplyJSONLists(a, b) {
    return listsDiff(a, b)
  }

  /**
   * @param {String} rawA
   * @param {String} rawB
   * @returns {String}
   */
  unapplyYAML(rawA, rawB) {
    const [a, b] = transformInputToYAML(rawA, rawB)
    const clearedConfig = this.unapplyJSON(a, b)

    return toYaml(clearedConfig)
  }

  /**
   * @param {String} a
   * @param {String} b
   * @returns {String}
   */
  unapplyLines(a, b) {
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

  /**
   * @param {String} fileName
   * @returns {Function} Unapply function
   */
  unapply(fileName) {
    const matchedMethod = this.determineUnapplyMethod(fileName)

    /**
     * @param {Object|String} options.current
     * @param {Object|String} options.upcoming
     * @param {Object|String} [options.cached]
     * @returns {Object|String|Array}
     */
    return ({ current, upcoming, cached }) => {
      if (!matchedMethod) return current

      return matchedMethod.bind(this)(current, upcoming, cached)
    }
  }
}

module.exports = Strategy
