class InternalError extends Error {
  /**
   * @param {string} message
   * @param {symbol} cause
   */
  constructor(message, cause) {
    super(message)
    this.cause = cause
  }
}

module.exports = InternalError
