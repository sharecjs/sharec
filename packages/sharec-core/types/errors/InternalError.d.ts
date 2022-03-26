export = InternalError
declare class InternalError extends Error {
  /**
   * @param {string} message
   * @param {symbol} cause
   */
  constructor(message: string, cause: symbol)
  cause: symbol
}
