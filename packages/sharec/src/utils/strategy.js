const path = require('path')
const { transformInput, toYaml } = require('./yaml')

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

  mergeJSON(a, b) {
    return {
      ...a,
      ...b,
    }
  }

  mergeYAML(rawA, rawB) {
    const [a, b] = transformInput(rawA, rawB)
    const newConfig = this.mergeJSON(a, b)

    return toYaml(newConfig)
  }

  merge(fileName) {
    const matchedMethod = this.determineMergeMethod(fileName)

    return (a, b) => {
      if (!matchedMethod) return b

      const res = matchedMethod.bind(this)(a, b)

      return res
    }
  }
}

module.exports = { Strategy }
