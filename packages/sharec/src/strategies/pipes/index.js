const { basename } = require('../../utils/std').path

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
}

const fallbackPipes = [require('./default/pipe')]

const getConfigPipe = configPath => {
  const configFilename = basename(configPath)
  const targetPipeKey = Object.keys(pipes).find(key => !!pipes[key].pipe(configFilename))

  if (!targetPipeKey) {
    return getFallbackConfigPipe(configPath)
  }

  return {
    processor: pipes[targetPipeKey].pipe(configFilename),
  }
}

const getFallbackConfigPipe = configPath => {
  const configFilename = basename(configPath)
  const targetPipe = fallbackPipes.find(pipe => !!pipe.pipe(configFilename))

  if (!targetPipe) return null

  return {
    processor: targetPipe.pipe(configFilename),
  }
}

module.exports = {
  pipes,
  getConfigPipe,
  getFallbackConfigPipe,
}
