const path = require('path')
const { diffLines } = require('diff')

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

module.exports = LinearStrategy
