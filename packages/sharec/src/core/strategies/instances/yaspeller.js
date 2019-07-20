const without = require('lodash/without')
const uniq = require('lodash/uniq')
const omit = require('lodash/omit')
const unset = require('lodash/unset')
const intersection = require('lodash/intersection')
const { Strategy } = require('../strategy')
const {
  deepMergeHashesWithoutKeys,
  hashesDiff,
} = require('../../../utils/hashes')

class YaspellerStrategy extends Strategy {
  mergeJSON(rawA, rawB) {
    const [a, b] = [rawA, rawB].map(config =>
      typeof config === 'string' ? JSON.parse(config) : config,
    )
    const aListsKeys = Object.keys(a).filter(key => Array.isArray(b[key]))
    const bListsKeys = Object.keys(b).filter(key => Array.isArray(b[key]))
    const allListsKeys = [].concat(aListsKeys, bListsKeys)
    const mergableListsKeys = intersection(aListsKeys, bListsKeys)
    const newConfig = deepMergeHashesWithoutKeys(a, b, allListsKeys)

    mergableListsKeys.forEach(key => {
      const items = [].concat(a[key], b[key])

      Object.assign(newConfig, {
        [key]: uniq(items),
      })
    })
    without(aListsKeys, ...mergableListsKeys).forEach(key => {
      Object.assign(newConfig, {
        [key]: a[key],
      })
    })
    without(bListsKeys, ...mergableListsKeys).forEach(key => {
      Object.assign(newConfig, {
        [key]: b[key],
      })
    })

    return newConfig
  }

  unapplyJSON(rawA, rawB) {
    const [a, b] = [rawA, rawB].map(config =>
      typeof config === 'string' ? JSON.parse(config) : config,
    )
    const bListsKeys = Object.keys(b).filter(key => Array.isArray(b[key]))
    const restoredConfig = omit(hashesDiff(a, b), bListsKeys)

    bListsKeys.forEach(key => {
      if (!a[key]) return

      const diff = without(a[key], ...b[key])

      if (diff.length !== 0) {
        Object.assign(restoredConfig, {
          [key]: diff,
        })
      } else {
        unset(restoredConfig, key)
      }
    })

    return restoredConfig
  }
}

const yaspellerStrategy = new YaspellerStrategy({
  json: ['yaspeller', '.yaspellerrc', '.yaspeller.json'],
})

module.exports = {
  YaspellerStrategy,
  yaspellerStrategy,
}
