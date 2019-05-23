const pick = require('lodash/pick')
const omit = require('lodash/omit')
const deepmerge = require('deepmerge')

const mergeHashes = (a = {}, b = {}) => ({
  ...a,
  ...b,
})

const mergeHashesWithFields = (a = {}, b = {}, fields = []) => {
  const pickedA = pick(a, fields)
  const pickedB = pick(b, fields)

  return {
    ...pickedA,
    ...pickedB,
  }
}

const deepMergeHashesWithFields = (a = {}, b = {}, fields = []) => {
  const pickedA = pick(a, fields)
  const pickedB = pick(b, fields)

  return deepmerge(pickedA, pickedB)
}

const mergeHashesWithoutFields = (a = {}, b = {}, fields = []) => {
  const pickedA = omit(a, fields)
  const pickedB = omit(b, fields)

  return {
    ...pickedA,
    ...pickedB,
  }
}

const deepMergeHashesWithoutFields = (a = {}, b = {}, fields = []) => {
  const pickedA = omit(a, fields)
  const pickedB = omit(b, fields)

  return deepmerge(pickedA, pickedB)
}

module.exports = {
  mergeHashes,
  mergeHashesWithFields,
  deepMergeHashesWithFields,
  mergeHashesWithoutFields,
  deepMergeHashesWithoutFields,
}
