const path = require('path')
const { diffLines } = require('diff')
const { mergeLists, listsDiff } = require('../../utils/lists')
const { hashesDiff, hashWithoutChangedFields } = require('../../utils/hashes')
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
  mergeJSON({ current, upcoming, cached }) {
    const [a, b] = [current, upcoming].map(config =>
      typeof config === 'string' ? JSON.parse(config) : config,
    )

    if (Array.isArray(a) || Array.isArray(b)) {
      return this.mergeJSONLists({
        current: a,
        upcoming: b,
      })
    }

    return this.mergeJSONHashes({ current: a, upcoming: b, cached })
  }

  /**
   * @param {Object} a
   * @param {Object} b
   * @returns {Object}
   */
  mergeJSONHashes({ current = {}, upcoming = {}, cached }) {
    if (cached) {
      // TODO: not sure that works correctly
      return {
        ...current,
        ...hashWithoutChangedFields(upcoming, cached),
      }
    }

    return {
      ...current,
      ...upcoming,
    }
  }

  /**
   * @param {Array} a
   * @param {Array} b
   * @returns {Array}
   */
  mergeJSONLists({ current = [], upcoming = [] }) {
    return mergeLists(current, upcoming)
  }

  /**
   * @param {String} rawA
   * @param {String} rawB
   * @returns {String}
   */
  mergeYAML({ current, upcoming, cached }) {
    const paramsInJSON = transformInputToYAML(current, upcoming)

    if (cached) {
      paramsInJSON.push(...transformInputToYAML(cached))
    }

    const newConfig = this.mergeJSON({
      current: paramsInJSON[0],
      upcoming: paramsInJSON[1],
      cached: paramsInJSON[2] || null,
    })

    return toYaml(newConfig)
  }

  /**
   * @param {String} a
   * @param {String} b
   * @returns {String}
   */
  mergeLines({ current, upcoming }) {
    return diffLines(current, upcoming).reduce((acc, line) => {
      if (line.added) {
        return [acc, line.value].join('')
      }

      return acc
    }, current)
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

      return matchedMethod.bind(this)({ current, upcoming, cached })
    }
  }

  /**
   * @param {Object|Array|String} rawA
   * @param {Object|Array|String} rawB
   * @returns {Object|Array}
   */
  unapplyJSON({ current, upcoming }) {
    const [a, b] = [current, upcoming].map(config =>
      typeof config === 'string' ? JSON.parse(config) : config,
    )

    if (Array.isArray(a) && Array.isArray(b)) {
      return this.unapplyJSONLists({
        current: a,
        upcoming: b,
      })
    }

    return this.unapplyJSONHashes({
      current: a,
      upcoming: b,
    })
  }

  /**
   * @param {Object} a
   * @param {Object} b
   * @returns {Object}
   */
  unapplyJSONHashes({ current, upcoming }) {
    return hashesDiff(current, upcoming)
  }

  /**
   * @param {Array} a
   * @param {Array} b
   * @returns {Array}
   */
  unapplyJSONLists({ current, upcoming }) {
    return listsDiff(current, upcoming)
  }

  /**
   * @param {String} rawA
   * @param {String} rawB
   * @returns {String}
   */
  unapplyYAML({ current, upcoming }) {
    const [a, b] = transformInputToYAML(current, upcoming)
    const clearedConfig = this.unapplyJSON({
      current: a,
      upcoming: b,
    })

    return toYaml(clearedConfig)
  }

  /**
   * @param {String} a
   * @param {String} b
   * @returns {String}
   */
  unapplyLines({ current, upcoming }) {
    const aLines = current.split('\n')
    const restoredConfig = []

    diffLines(current, upcoming).forEach(line => {
      const lineIdx = aLines.indexOf(line.value.replace(/\n$/, ''))

      if (line.removed && lineIdx !== -1) {
        restoredConfig.push(line.value)
      }
    })

    if (restoredConfig.length === 0) return ''

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

      return matchedMethod.bind(this)({ current, upcoming, cached })
    }
  }
}

module.exports = Strategy
