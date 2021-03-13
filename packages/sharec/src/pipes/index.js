const omit = require('lodash/omit')
const { basename } = require('sharec-utils/std').path

// all pipes mapping
const pipes = {
  babel: require('./babel/pipe'),
  browserslist: require('./browserslist/pipe'),
  eslint: require('./eslint/pipe'),
  gitignore: require('./gitignore/pipe'),
  lintStaged: require('./lintStaged/pipe'),
  npmignore: require('./npmignore/pipe'),
  package: require('./package/pipe'),
  stylelint: require('./stylelint/pipe'),
  yaspeller: require('./yaspeller/pipe'),
  prettier: require('./prettier/pipe'),
}

// pipes for configs which not have any specific strategy
const fallbackPipes = [require('./default/pipe')]

/**
 * Returns pipe for specific configuration file by its name
 * If pipe is not exist - tries to resolve default pipe
 * If default pipe is not exist too - returns null
 * @param {String} configPath
 * @returns {Object|null} result
 * @property {Function} result.processor Configuration processor function
 * @property {String} [result.alias] Configuration file name after write
 */
const getConfigPipe = (configPath) => {
  const configFilename = basename(configPath)
  const targetPipeKey = Object.keys(pipes).find((key) => !!pipes[key].pipe(configFilename))

  if (!targetPipeKey) {
    return getFallbackConfigPipe(configPath)
  }

  return {
    processor: pipes[targetPipeKey].pipe(configFilename),
    ...omit(pipes[targetPipeKey], ['pipe']),
  }
}

/**
 * Trying to find default pipe for given configuration file
 * If it is not exist - returns null
 * @param {String} configPath
 * @returns {Object|null} result
 * @property {Function} result.processor Configuration processor function
 * @property {String} [result.alias] Configuration file name after write
 */
const getFallbackConfigPipe = (configPath) => {
  const configFilename = basename(configPath)
  const targetPipe = fallbackPipes.find((pipe) => !!pipe.pipe(configFilename))

  if (!targetPipe) return null

  return {
    processor: targetPipe.pipe(configFilename),
    ...omit(pipes[targetPipe], ['pipe']),
  }
}

module.exports = {
  pipes,
  getConfigPipe,
  getFallbackConfigPipe,
}
