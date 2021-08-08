class InternalError extends Error {
  constructor(message, cause) {
    super(message)
    this.cause = cause
  }
}

module.exports = InternalError
