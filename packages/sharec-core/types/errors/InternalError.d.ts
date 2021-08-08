export = InternalError
declare class InternalError extends Error {
  constructor(message: any, cause: any)
  cause: any
}
