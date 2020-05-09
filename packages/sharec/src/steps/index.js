// Guards
const isAlreadyInstalled = require('./isAlreadyInstalled')
const isDependantOfSharec = require('./isDependantOfSharec')
const isIgnoresSharecConfigs = require('./isIgnoresSharecConfigs')
// Input
const readConfigs = require('./readConfigs')
const readTargetPackage = require('./readTargetPackage')
const readUpcomingPackage = require('./readUpcomingPackage')
const readCache = require('./readCache')
// Output
const writeConfigs = require('./writeConfigs')
const writeMeta = require('./writeMeta')
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

  readConfigs,
  readTargetPackage,
  readUpcomingPackage,
  readCache,

  writeConfigs,
  writeMeta,
  writeCache,
}

module.exports = {
  composeSteps,
  steps,
}
