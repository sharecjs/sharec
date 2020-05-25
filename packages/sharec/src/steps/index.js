// Guards
const isAlreadyInstalled = require('./isAlreadyInstalled')
const isDependantOfSharec = require('./isDependantOfSharec')
const isIgnoresSharecConfigs = require('./isIgnoresSharecConfigs')
// Input
const readConfigs = require('./readConfigs')
const readTargetPackage = require('./readTargetPackage')
const readUpcomingPackage = require('./readUpcomingPackage')
const readCache = require('./readCache')
// Processing
const mergeConfigs = require('./mergeConfigs')
const insertEOL = require('./insertEOL')
// Output
const writeConfigs = require('./writeConfigs')
const insertMeta = require('./insertMeta')
const writeCache = require('./writeCache')

const composeSteps = (...steps) => async (input) => {
  let lastInput = input

  for (const step of steps) {
    lastInput = await step(lastInput)
  }

  return lastInput
}

const steps = {
  isAlreadyInstalled,
  isDependantOfSharec,
  isIgnoresSharecConfigs,

  mergeConfigs,
  insertEOL,
  insertMeta,

  readConfigs,
  readTargetPackage,
  readUpcomingPackage,
  readCache,

  writeConfigs,
  writeCache,
}

module.exports = {
  composeSteps,
  steps,
}
