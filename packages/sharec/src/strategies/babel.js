const get = require('lodash/get')
const pick = require('lodash/pick')
const omit = require('lodash/omit')
const xor = require('lodash/xor')
const isEmpty = require('lodash/isEmpty')
const intersection = require('lodash/intersection')
const { Strategy } = require('../utils/strategy')
const { withKeys, mergeHashes, hashesChangesDiff } = require('../utils/hashes')
const { mergePairs, shallowPairsChangesDiff } = require('../utils/pairs')

class BabelStrategy extends Strategy {
  mergeEnv(a, b) {
    const newEnvConfig = mergeHashes(pick(a, ['ignore']), pick(b, ['ignore']))
    const mergedPresets = mergePairs(
      get(a, 'presets', []),
      get(b, 'presets', []),
    )
    const mergedPlugins = mergePairs(
      get(a, 'plugins', []),
      get(b, 'plugins', []),
    )

    if (mergedPresets.length > 0) {
      Object.assign(newEnvConfig, {
        presets: mergedPresets,
      })
    }

    if (mergedPlugins.length > 0) {
      Object.assign(newEnvConfig, {
        plugins: mergedPlugins,
      })
    }

    return newEnvConfig
  }

  unapplyEnv(a, b) {
    const restoredEnvConfig = withKeys(hashesChangesDiff, ['ignore'])(a, b)
    const restoredPresets = shallowPairsChangesDiff(
      get(a, 'presets', []),
      get(b, 'presets', []),
    )
    const restoredPlugins = shallowPairsChangesDiff(
      get(a, 'plugins', []),
      get(b, 'plugins', []),
    )

    if (restoredPresets.length > 0) {
      Object.assign(restoredEnvConfig, {
        presets: restoredPresets,
      })
    }

    if (restoredPlugins.length > 0) {
      Object.assign(restoredEnvConfig, {
        plugins: restoredPlugins,
      })
    }

    return restoredEnvConfig
  }

  mergeJSON(rawA, rawB) {
    const [a, b] = [rawA, rawB].map(config =>
      typeof config === 'string' ? JSON.parse(config) : config,
    )
    const newConfig = this.mergeEnv(omit(a, ['env']), omit(b, ['env']))
    const envConfigsA = get(a, ['env'], null)
    const envConfigsB = get(b, ['env'], null)

    if (!envConfigsA && !envConfigsB) {
      return newConfig
    } else if (!envConfigsA && envConfigsB) {
      Object.assign(newConfig, {
        env: envConfigsB,
      })

      return newConfig
    } else if (envConfigsA && !envConfigsB) {
      Object.assign(newConfig, {
        env: envConfigsA,
      })

      return newConfig
    }

    Object.assign(newConfig, {
      env: {},
    })

    const envsToMerge = intersection(
      Object.keys(envConfigsA),
      Object.keys(envConfigsB),
    )
    const uniqueEnvsFromA = xor(Object.keys(envConfigsA), envsToMerge)
    const uniqueEnvsFromB = xor(Object.keys(envConfigsB), envsToMerge)

    envsToMerge.forEach(env => {
      const mergedEnv = this.mergeEnv(envConfigsA[env], envConfigsB[env])

      Object.assign(newConfig.env, {
        [env]: mergedEnv,
      })
    })

    if (uniqueEnvsFromA.length > 0) {
      Object.assign(newConfig.env, pick(envConfigsA, uniqueEnvsFromA))
    }

    if (uniqueEnvsFromB.length > 0) {
      Object.assign(newConfig.env, pick(envConfigsB, uniqueEnvsFromB))
    }

    return newConfig
  }

  // TODO:
  unapplyJSON(rawA, rawB) {
    const [a, b] = [rawA, rawB].map(config =>
      typeof config === 'string' ? JSON.parse(config) : config,
    )
    const restoredConfig = this.unapplyEnv(omit(a, ['env']), omit(b, ['env']))
    const envConfigsA = get(a, ['env'], null)
    const envConfigsB = get(b, ['env'], null)

    if (!envConfigsA || !envConfigsB) {
      return restoredConfig
    }

    Object.assign(restoredConfig, {
      env: {},
    })

    Object.keys(envConfigsB).forEach(key => {
      if (!envConfigsA[key]) return

      const restoredEnv = this.unapplyEnv(envConfigsA[key], envConfigsB[key])

      if (isEmpty(restoredEnv)) return

      Object.assign(restoredConfig.env, {
        [key]: restoredEnv,
      })
    })

    return restoredConfig
  }
}
const babelStrategy = new BabelStrategy({
  json: ['babel', '.babelrc', '.babelrc.json', 'babelrc.js', 'babel.config.js'],
})

module.exports = {
  BabelStrategy,
  babelStrategy,
}
