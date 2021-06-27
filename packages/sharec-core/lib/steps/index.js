// @ts-check
const isAlreadyInstalled = require('./isAlreadyInstalled')
const isDependantOfSharec = require('./isDependantOfSharec')
const isIgnoresSharecConfigs = require('./isIgnoresSharecConfigs')
const readConfigs = require('./readConfigs')
const readLocalConfigs = require('./readLocalConfigs')
const readTargetPackage = require('./readTargetPackage')
const readUpcomingPackage = require('./readUpcomingPackage')
const readCache = require('./readCache')
const readEditorconfig = require('./readEditorconfig')
const readPrettier = require('./readPrettier')
const readSharecConfig = require('./readSharecConfig')
const mergeConfigs = require('./mergeConfigs')
const insertEOL = require('./insertEOL')
const applyFormatting = require('./applyFormatting')
const writeConfigs = require('./writeConfigs')
const insertMeta = require('./insertMeta')
const writeCache = require('./writeCache')
const filterChanged = require('./filterChanged')

/**
 * @typedef {import('../').Input} Input
 */

/**
 * Composes steps in one function
 * Executes each step and pass result to the next one
 * @param {Array<Function>} steps Steps functions
 * @returns {Function}
 */
const composeSteps = (...steps) =>
  /**
   * @param {Input} input
   * @returns {Promise<Input>}
   */
  async (input) => {
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
  applyFormatting,
  readConfigs,
  readLocalConfigs,
  readTargetPackage,
  readUpcomingPackage,
  readCache,
  readEditorconfig,
  readPrettier,
  readSharecConfig,
  writeConfigs,
  writeCache,
  filterChanged,
}

module.exports = {
  composeSteps,
  steps,
}
