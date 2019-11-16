const { flatSearch } = require('../../utils/fs')

const collectConfigsPaths = async configsPath => {
  const configsPaths = await flatSearch({
    path: configsPath,
    pattern: /^((?!lock).)*$/,
  })

  return configsPaths
}

module.exports = {
  collectConfigsPaths,
}
