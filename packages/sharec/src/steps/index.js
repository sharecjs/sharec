// Guards
const isAlreadyInstalled = require('./isAlreadyInstalled')
const isDependantOfSharec = require('./isDependantOfSharec')
const isIgnoresSharecConfigs = require('./isIgnoresSharecConfigs')
const isTargetInvalid = require('./isTargetInvalid')
const isTargetTheConfig = require('./isTargetTheConfig')
// Input
const readConfigs = require('./readConfigs')
const readTargetMeta = require('./readTargetMeta')
const readUpcomingMeta = require('./readUpcomingMeta')
// Output
const writeConfigs = require('./writeConfigs')
const writeMeta = require('./writeMeta')
const writeCache = require('./writeCache')

module.exports = {
  isAlreadyInstalled,
  isDependantOfSharec,
  isIgnoresSharecConfigs,
  isTargetInvalid,
  isTargetTheConfig,

  readConfigs,
  readTargetMeta,
  readUpcomingMeta,

  writeConfigs,
  writeMeta,
  writeCache,
}
