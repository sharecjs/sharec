const CAUSES = {
  ALREADY_INSTALLED: {
    message: () => 'This configuration version was already installed!',
    symbol: Symbol('ALREADY_INSTALLED'),
  },
  IS_DEPENDANT_OF_SHAREC: {
    message: () =>
      "Probably target project is depends of sharec and it can't be installed here because possibility of cyclic script execution!",
    symbol: Symbol('IS_DEPENDANT_OF_SHAREC'),
  },
  IS_IGNORES_SHAREC: {
    message: () => "Configuration can't be installed, because target project ignores sharec configs!",
    symbol: Symbol('IS_IGNORES_SHAREC'),
  },
  CONFIGS_NOT_FOUND: {
    message: path => `Configuration files were not found in "${path}"`,
    symbol: Symbol('CONFIGS_NOT_FOUND'),
  },
}

module.exports = CAUSES
