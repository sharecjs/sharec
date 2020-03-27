const path = require('path')
const { flatSearch } = require('../../utils/fs')

const getUpcomingConfigsPath = targetProcess => {
  const isWindows = targetProcess.platform === 'win32'
  const { PWD, dp0 } = targetProcess.env

  if (!isWindows) return PWD

  return path.resolve(dp0, '../../')
}

const collectConfigsPaths = async configsPath => {
  const configsPaths = await flatSearch({
    path: configsPath,
    pattern: /^((?!lock).)*$/,
  })

  return configsPaths
}

module.exports = {
  getUpcomingConfigsPath,
  collectConfigsPaths,
}
