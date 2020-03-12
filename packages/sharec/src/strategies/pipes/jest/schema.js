const isObject = require('lodash/isObject')
const { compose, fork } = require('../../actions')
const { listConcatAtom, primitiveAtom, hashAtom } = require('../../atoms')

const jestJson = compose({
  // automock [boolean]
  // bail [number | boolean]
  // browser [boolean]
  // cacheDirectory [string]
  // clearMocks [boolean]
  // collectCoverage [boolean]
  // coverageDirectory [string]
  // coverageProvider [string]
  // coverageThreshold [object]
  // dependencyExtractor [string]
  // displayName [string, object]
  // errorOnDeprecated [boolean]
  // extraGlobals [array<string>]
  // forceCoverageMatch [array<string>]
  // globals [object]
  // globalSetup [string]
  // globalTeardown [string]
  // maxConcurrency [number]
  // moduleDirectories [array<string>]
  // moduleFileExtensions [array<string>]
  // moduleNameMapper [object<string, string>]
  // modulePathIgnorePatterns [array<string>]
  // modulePaths [array<string>]
  // notify [boolean]
  // notifyMode [string]
  // preset [string]
  // prettierPath [string]
  // projects [array<string | ProjectConfig>]
  // reporters [array<moduleName | [moduleName, options]>]
  // resetMocks [boolean]
  // resetModules [boolean]
  // resolver [string]
  // restoreMocks [boolean]
  // rootDir [string]
  // roots [array<string>]
  // runner [string]
  // setupFiles [array]
  // setupFilesAfterEnv [array]
  // snapshotResolver [string]
  // snapshotSerializers [array<string>]
  // testEnvironment [string]
  // testEnvironmentOptions [Object]
  // testMatch [array<string>]
  // testPathIgnorePatterns [array<string>]
  // testRegex [string | array<string>]
  // testResultsProcessor [string]
  // testRunner [string]
  // testSequencer [string]
  // testTimeout [number]
  // testURL [string]
  // timers [string]
  // transform [object<string, pathToTransformer | [pathToTransformer, object]>]
  // transformIgnorePatterns [array<string>]
  // unmockedModulePathPatterns [array<string>]
  // verbose [boolean]
  // watchPathIgnorePatterns [array<string>]
  // watchPlugins [array<string | [string, Object]>]
  $$default: fork([
    [Array.isArray, listConcatAtom],
    [isObject, hashAtom],
    primitiveAtom,
  ]),
})

module.exports = {
  jestJson,
}
