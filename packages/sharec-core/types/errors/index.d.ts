export const errorCauses: {
  ALREADY_INSTALLED: {
    message: () => string
    symbol: symbol
  }
  IS_DEPENDANT_OF_SHAREC: {
    message: () => string
    symbol: symbol
  }
  IS_IGNORES_SHAREC: {
    message: () => string
    symbol: symbol
  }
  CONFIGS_NOT_FOUND: {
    message: (path: any) => string
    symbol: symbol
  }
}
export const InternalError: typeof import('./InternalError')
