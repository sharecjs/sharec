const get = require('lodash/get')
const pick = require('lodash/pick')
const omit = require('lodash/omit')
const xor = require('lodash/xor')
const intersection = require('lodash/intersection')
const deepmerge = require('deepmerge')
const { pipe } = require('../utils')
const {
  mergeHashes,
  mergeHashesWithKeys,
  deepMergeHashesWithKeys,
  deepMergeHashesWithoutKeys,
} = require('../utils/hashes')
const {
  toPairs,
  toPairsWithKeys,
  fromPairs,
  fillPairs,
  mergePairs,
  deepMergePairs,
  mergePairsWithKeys,
  mergePairsWithoutKeys,
  deepMergePairsWithKeys,
  deepMergePairsWithoutKeys,
} = require('../utils/pairs')

const mergeEnv = (a, b) => {
  const newEnvConfig = mergeHashes(pick(a, ['ignore']), pick(b, ['ignore']))

  Object.assign(newEnvConfig, {
    presets: mergePairs(get(a, 'presets', []), get(b, 'presets', [])),
  })
  Object.assign(newEnvConfig, {
    plugins: mergePairs(get(a, 'plugins', []), get(b, 'plugins', [])),
  })

  return newEnvConfig
}

const strategy = (a, b) => {
  const newConfig = mergeEnv(omit(a, ['env']), omit(b, ['env']))
  const envConfigsA = get(a, ['env'], null)
  const envConfigsB = get(b, ['env'], null)

  if (!envConfigsA && envConfigsB) {
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
    const mergedEnv = mergeEnv(envConfigsA[env], envConfigsB[env])

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

module.exports = strategy
