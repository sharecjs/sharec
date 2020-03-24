const path = require('path')

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

const getConfigPipe = configPath => {
  const configFilename = path.basename(configPath)
  const targetPipeKey = Object.keys(pipes).find(
    key => !!pipes[key](configFilename),
  )

  if (!targetPipeKey) return null

  return pipes[targetPipeKey](configFilename)
}

module.exports = {
  pipes,
  getConfigPipe,
}
